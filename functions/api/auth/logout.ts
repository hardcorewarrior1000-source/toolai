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

export const onRequestOptions = () => new Response(null, { status: 204, headers: CORS });

export async function onRequestPost(ctx) {
  const cookie = ctx.request.headers.get("Cookie") || "";
  const m = cookie.match(/session=([a-f0-9]+)/);
  if (m && ctx.env?.toolai_auth) {
    await ctx.env.toolai_auth.prepare("DELETE FROM sessions WHERE token = ?").bind(m[1]).run();
  }
  return json({ ok: true }, 200, {
    "Set-Cookie": "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
  });
}
