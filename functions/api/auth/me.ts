const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

async function getUser(request, env) {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/session=([a-f0-9]+)/);
  if (!m) return null;
  const db = env?.toolai_auth;
  if (!db) return null;
  const sess = await db.prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?").bind(m[1]).first();
  if (!sess) return null;
  if (new Date(sess.expires_at) < new Date()) return null;
  return await db.prepare("SELECT id, email FROM users WHERE id = ?").bind(sess.user_id).first();
}

export const onRequestOptions = () => new Response(null, { status: 204, headers: CORS });

export async function onRequestGet(ctx) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);

  const db = ctx.env?.toolai_auth;
  const license = await db.prepare("SELECT key, tier, chain, activated_at, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(user.id).first();
  const isActive = license && new Date(license.expires_at) > new Date();

  return json({
    email: user.email,
    tier: isActive ? license.tier : "free",
    license: isActive ? {
      key: license.key,
      tier: license.tier,
      chain: license.chain,
      activatedAt: license.activated_at,
      expiresAt: license.expires_at,
    } : null,
  });
}
