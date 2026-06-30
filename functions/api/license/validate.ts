import { json, getUser, handleOptions } from "../_shared";

export const onRequestOptions = handleOptions;

export async function onRequestGet(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ tier: "free", valid: false });

  const db = ctx.env?.toolai_auth;
  if (!db) return json({ tier: "free", valid: false });

  const license = await db
    .prepare("SELECT tier, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1")
    .bind(user.id)
    .first();

  if (!license || new Date(license.expires_at as string) < new Date()) {
    return json({ tier: "free", valid: false });
  }

  return json({
    tier: license.tier,
    valid: true,
    expiresAt: license.expires_at,
  });
}
