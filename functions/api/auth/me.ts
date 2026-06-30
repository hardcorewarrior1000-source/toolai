import { json, getUser, handleOptions } from "../_shared";

export const onRequestOptions = handleOptions;

export async function onRequestGet(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);

  const db = ctx.env?.toolai_auth;
  const license = await db
    .prepare("SELECT key, tier, chain, activated_at, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1")
    .bind(user.id)
    .first();
  const isActive = license && new Date(license.expires_at as string) > new Date();

  return json({
    email: user.email,
    tier: isActive ? license.tier : "free",
    license: isActive
      ? {
          key: license.key,
          tier: license.tier,
          chain: license.chain,
          activatedAt: license.activated_at,
          expiresAt: license.expires_at,
        }
      : null,
  });
}
