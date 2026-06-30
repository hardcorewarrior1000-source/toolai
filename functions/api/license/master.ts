import { json, getUser, handleOptions } from "../_shared";

const MASTER_KEY = "ZELVE-MASTER-2026";

export const onRequestOptions = handleOptions;

export async function onRequestPost(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);

  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);

  const { key } = await ctx.request.json();
  if (!key) return json({ error: "Key required" }, 400);

  if (key.trim() !== MASTER_KEY) {
    return json({ error: "Invalid master key" }, 400);
  }

  const existing = await db
    .prepare("SELECT id FROM licenses WHERE user_id = ? AND tier = 'enterprise' AND expires_at > datetime('now')")
    .bind(user.id)
    .first();

  if (existing) {
    return json({ ok: true, message: "Already activated", tier: "enterprise" });
  }

  const expiresAt = new Date(Date.now() + 365 * 10 * 24 * 60 * 60 * 1000).toISOString();
  const key_ = "ZELVE-MASTER-LIFETIME";

  await db
    .prepare("INSERT INTO licenses (user_id, key, tier, tx_hash, chain, expires_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(user.id, key_, "enterprise", "master-key", "master", expiresAt)
    .run();

  return json({ ok: true, tier: "enterprise", expiresAt });
}
