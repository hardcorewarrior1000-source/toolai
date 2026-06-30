import { json, verifyPw, genToken, handleOptions } from "../_shared";

export const onRequestOptions = handleOptions;

export async function onRequestPost(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);

  const { email, password } = await ctx.request.json();
  if (!email || !password) return json({ error: "Email and password required" }, 400);

  const user = await db.prepare("SELECT id, email, password_hash FROM users WHERE email = ?").bind(email.toLowerCase()).first();
  if (!user) return json({ error: "Invalid credentials" }, 401);

  const valid = await verifyPw(password, user.password_hash as string);
  if (!valid) return json({ error: "Invalid credentials" }, 401);

  const token = genToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await db.prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)").bind(user.id, token, expiresAt).run();

  return json({ ok: true, email: user.email }, 200, {
    "Set-Cookie": "session=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000",
  });
}
