const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS, ...extra },
  });
}

async function hashPw(pw, salt) {
  const enc = new TextEncoder();
  if (!salt) {
    const s = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(s).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" }, key, 256);
  return salt + ":" + Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPw(pw, stored) {
  return (await hashPw(pw, stored.split(":")[0])) === stored;
}

function genToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestOptions = () => new Response(null, { status: 204, headers: CORS });

export async function onRequestPost(ctx) {
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);

  const { email, password } = await ctx.request.json();
  if (!email || !password) return json({ error: "Email and password required" }, 400);

  const user = await db.prepare("SELECT id, email, password_hash FROM users WHERE email = ?").bind(email.toLowerCase()).first();
  if (!user) return json({ error: "Invalid credentials" }, 401);

  const valid = await verifyPw(password, user.password_hash);
  if (!valid) return json({ error: "Invalid credentials" }, 401);

  const token = genToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await db.prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)").bind(user.id, token, expiresAt).run();

  return json({ ok: true, email: user.email }, 200, {
    "Set-Cookie": "session=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000",
  });
}
