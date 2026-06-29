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

function genKey(txHash) {
  let h = 0;
  for (let i = 0; i < txHash.length; i++) {
    h = ((h << 5) - h) + txHash.charCodeAt(i);
    h = h & h;
  }
  const hex = Math.abs(h).toString(16).padStart(8, "0");
  const extra = txHash.slice(0, 8).toUpperCase();
  return "TOOLAI-" + hex.slice(0, 4).toUpperCase() + "-" + hex.slice(4, 8).toUpperCase() + "-" + extra.slice(0, 4) + "-" + extra.slice(4, 8);
}

export const onRequestOptions = () => new Response(null, { status: 204, headers: CORS });

export async function onRequestPost(ctx) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);

  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);

  const { txHash, chain, tier } = await ctx.request.json();
  if (!txHash || !chain || !tier) return json({ error: "Missing fields" }, 400);

  const key = genKey(txHash);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await db.prepare("INSERT INTO licenses (user_id, key, tier, tx_hash, chain, expires_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(user.id, key, tier, txHash, chain, expiresAt)
    .run();

  return json({ ok: true, key, tier, expiresAt });
}
