const ORIGIN = "https://toolai.zelve.xyz";

export const CORS = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS, ...extra },
  });
}

export async function hashPw(pw: string, salt?: string): Promise<string> {
  const enc = new TextEncoder();
  if (!salt) {
    const s = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(s).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    key,
    256
  );
  return salt + ":" + Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPw(pw: string, stored: string): Promise<boolean> {
  return (await hashPw(pw, stored.split(":")[0])) === stored;
}

export function genToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function getUser(
  request: Request,
  env: { toolai_auth?: D1Database }
): Promise<{ id: number; email: string } | null> {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/session=([a-f0-9]+)/);
  if (!m) return null;
  const db = env?.toolai_auth;
  if (!db) return null;
  const sess = await db
    .prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?")
    .bind(m[1])
    .first();
  if (!sess) return null;
  if (new Date(sess.expires_at as string) < new Date()) return null;
  return await db
    .prepare("SELECT id, email FROM users WHERE id = ?")
    .bind(sess.user_id)
    .first();
}

export function handleOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
