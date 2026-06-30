import { CORS, json, hashPw, genToken, handleOptions } from "../_shared";

export const onRequestOptions = handleOptions;

export async function onRequestPost(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);

  const { email, password } = await ctx.request.json();
  if (!email || !password) return json({ error: "Email and password required" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Invalid email" }, 400);
  if (password.length < 8) return json({ error: "Password must be 8+ characters" }, 400);

  const existing = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email.toLowerCase()).first();
  if (existing) return json({ error: "Email already registered" }, 409);

  const hash = await hashPw(password);
  const result = await db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").bind(email.toLowerCase(), hash).run();
  const userId = result.meta?.last_row_id;

  const token = genToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await db.prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)").bind(userId, token, expiresAt).run();

  return json({ ok: true, email: email.toLowerCase() }, 200, {
    "Set-Cookie": "session=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000",
  });
}
