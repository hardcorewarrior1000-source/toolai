import { json, handleOptions } from "../_shared";

export const onRequestOptions = handleOptions;

export async function onRequestPost(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const cookie = ctx.request.headers.get("Cookie") || "";
  const m = cookie.match(/session=([a-f0-9]+)/);
  if (m && ctx.env?.toolai_auth) {
    await ctx.env.toolai_auth.prepare("DELETE FROM sessions WHERE token = ?").bind(m[1]).run();
  }
  return json({ ok: true }, 200, {
    "Set-Cookie": "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0",
  });
}
