export interface Env {
  toolai_auth: D1Database;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Credentials": "true",
};

function json(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS, ...headers },
  });
}

async function hashPassword(password: string, salt?: string): Promise<string> {
  const enc = new TextEncoder();
  if (!salt) {
    const saltBuf = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(saltBuf).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const key = await crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" }, key, 256);
  const hash = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${salt}:${hash}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt] = stored.split(":");
  const newHash = await hashPassword(password, salt);
  return newHash === stored;
}

function generateToken(): string {
  const buf = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(buf).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateLicenseKey(txHash: string): string {
  const enc = new TextEncoder();
  // Simple deterministic key from txHash
  let hash = 0;
  for (let i = 0; i < txHash.length; i++) {
    const char = txHash.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  const parts = [
    hex.slice(0, 4).toUpperCase(),
    hex.slice(4, 8).toUpperCase(),
  ];
  // Add some more entropy from the tx hash
  const extra = txHash.slice(0, 8).toUpperCase();
  return `TOOLAI-${parts[0]}-${parts[1]}-${extra.slice(0, 4)}-${extra.slice(4, 8)}`;
}

function getSessionCookie(token: string): string {
  return `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`;
}

async function getUser(request: Request, env: Env): Promise<{ id: number; email: string } | null> {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/session=([a-f0-9]+)/);
  if (!match) return null;
  const token = match[1];

  const session = await env.toolai_auth
    .prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?")
    .bind(token)
    .first();
  if (!session) return null;
  if (new Date(session.expires_at as string) < new Date()) return null;

  const user = await env.toolai_auth
    .prepare("SELECT id, email FROM users WHERE id = ?")
    .bind(session.user_id)
    .first();
  return user ? { id: user.id as number, email: user.email as string } : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  // POST /api/auth/signup
  if (path === "/api/auth/signup" && request.method === "POST") {
    const { email, password } = await request.json<{ email?: string; password?: string }>();
    if (!email || !password) return json({ error: "Email and password required" }, 400);
    if (!EMAIL_RE.test(email)) return json({ error: "Invalid email" }, 400);
    if (password.length < 6) return json({ error: "Password must be 6+ characters" }, 400);

    const existing = await env.toolai_auth.prepare("SELECT id FROM users WHERE email = ?").bind(email.toLowerCase()).first();
    if (existing) return json({ error: "Email already registered" }, 409);

    const hash = await hashPassword(password);
    const result = await env.toolai_auth
      .prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)")
      .bind(email.toLowerCase(), hash)
      .run();

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    await env.toolai_auth
      .prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)")
      .bind(result.meta.last_row_id, token, expiresAt)
      .run();

    return json({ ok: true, email: email.toLowerCase() }, 200, {
      "Set-Cookie": getSessionCookie(token),
    });
  }

  // POST /api/auth/login
  if (path === "/api/auth/login" && request.method === "POST") {
    const { email, password } = await request.json<{ email?: string; password?: string }>();
    if (!email || !password) return json({ error: "Email and password required" }, 400);

    const user = await env.toolai_auth
      .prepare("SELECT id, email, password_hash FROM users WHERE email = ?")
      .bind(email.toLowerCase())
      .first();
    if (!user) return json({ error: "Invalid credentials" }, 401);

    const valid = await verifyPassword(password, user.password_hash as string);
    if (!valid) return json({ error: "Invalid credentials" }, 401);

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    await env.toolai_auth
      .prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)")
      .bind(user.id, token, expiresAt)
      .run();

    return json({ ok: true, email: user.email }, 200, {
      "Set-Cookie": getSessionCookie(token),
    });
  }

  // GET /api/auth/me
  if (path === "/api/auth/me" && request.method === "GET") {
    const user = await getUser(request, env);
    if (!user) return json({ error: "Not logged in" }, 401);

    const license = await env.toolai_auth
      .prepare("SELECT key, tier, chain, activated_at, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1")
      .bind(user.id)
      .first();

    const isActive = license && new Date(license.expires_at as string) > new Date();

    return json({
      email: user.email,
      tier: isActive ? license!.tier : "free",
      license: isActive ? {
        key: license!.key,
        tier: license!.tier,
        chain: license!.chain,
        activatedAt: license!.activated_at,
        expiresAt: license!.expires_at,
      } : null,
    });
  }

  // POST /api/auth/logout
  if (path === "/api/auth/logout" && request.method === "POST") {
    const cookie = request.headers.get("Cookie") || "";
    const match = cookie.match(/session=([a-f0-9]+)/);
    if (match) {
      await env.toolai_auth.prepare("DELETE FROM sessions WHERE token = ?").bind(match[1]).run();
    }
    return json({ ok: true }, 200, {
      "Set-Cookie": "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
    });
  }

  // POST /api/license/activate
  if (path === "/api/license/activate" && request.method === "POST") {
    const user = await getUser(request, env);
    if (!user) return json({ error: "Not logged in" }, 401);

    const { txHash, chain, tier, usdValue } = await request.json<{ txHash?: string; chain?: string; tier?: string; usdValue?: number }>();
    if (!txHash || !chain || !tier) return json({ error: "Missing fields" }, 400);

    const key = generateLicenseKey(txHash);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await env.toolai_auth
      .prepare("INSERT INTO licenses (user_id, key, tier, tx_hash, chain, expires_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(user.id, key, tier, txHash, chain, expiresAt)
      .run();

    return json({ ok: true, key, tier, expiresAt });
  }

  return json({ error: "Not found" }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (err) {
      return json({ error: "Internal error" }, 500);
    }
  },
};
