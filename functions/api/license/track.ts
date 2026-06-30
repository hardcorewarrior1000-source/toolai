import { json, getUser, handleOptions } from "../_shared";

const ALL_UNLIMITED: Record<string, "unlimited"> = {
  "password-generator": "unlimited",
  "json-formatter": "unlimited",
  "word-counter": "unlimited",
  "text-to-slug": "unlimited",
  "gradient-generator": "unlimited",
  "image-to-base64": "unlimited",
  "crypto-address-validator": "unlimited",
  "crypto-unit-converter": "unlimited",
  "mnemonic-generator": "unlimited",
  "crypto-payment-link": "unlimited",
};

const TIER_LIMITS: Record<string, Record<string, number | "unlimited">> = {
  free: {
    "ai-humanizer": 2500, "ai-chatbot": 2500, "color-palette": 2500,
    "image-to-prompt": 2500, "qr-generator": 2500, "crypto-price-calculator": 2500,
    "eth-gas-estimator": 2500, "wallet-balance-checker": 2500, ...ALL_UNLIMITED,
  },
  starter: {
    "ai-humanizer": 100000, "ai-chatbot": 100000, "color-palette": 100000,
    "image-to-prompt": 100000, "qr-generator": 100000, "crypto-price-calculator": 100000,
    "eth-gas-estimator": 100000, "wallet-balance-checker": 100000, ...ALL_UNLIMITED,
  },
  pro: {
    "ai-humanizer": "unlimited", "ai-chatbot": "unlimited", "color-palette": "unlimited",
    "image-to-prompt": "unlimited", "qr-generator": "unlimited", "crypto-price-calculator": "unlimited",
    "eth-gas-estimator": "unlimited", "wallet-balance-checker": "unlimited", ...ALL_UNLIMITED,
  },
  business: {
    "ai-humanizer": "unlimited", "ai-chatbot": "unlimited", "color-palette": "unlimited",
    "image-to-prompt": "unlimited", "qr-generator": "unlimited", "crypto-price-calculator": "unlimited",
    "eth-gas-estimator": "unlimited", "wallet-balance-checker": "unlimited", ...ALL_UNLIMITED,
  },
  enterprise: {
    "ai-humanizer": "unlimited", "ai-chatbot": "unlimited", "color-palette": "unlimited",
    "image-to-prompt": "unlimited", "qr-generator": "unlimited", "crypto-price-calculator": "unlimited",
    "eth-gas-estimator": "unlimited", "wallet-balance-checker": "unlimited", ...ALL_UNLIMITED,
  },
};

export const onRequestOptions = handleOptions;

export async function onRequestPost(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);

  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);

  const { toolId } = await ctx.request.json();
  if (!toolId) return json({ error: "Missing toolId" }, 400);

  const license = await db
    .prepare("SELECT tier, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1")
    .bind(user.id)
    .first();

  const tier = license && new Date(license.expires_at as string) > new Date()
    ? (license.tier as string)
    : "free";

  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  const limit = limits[toolId] ?? 5;

  if (limit === "unlimited") {
    await db
      .prepare(
        `INSERT INTO usage (user_id, tool_id, date, count) VALUES (?, ?, ?, 1)
         ON CONFLICT(user_id, tool_id, date) DO UPDATE SET count = count + 1`
      )
      .bind(user.id, toolId, new Date().toISOString().split("T")[0])
      .run();
    return json({ allowed: true, remaining: "unlimited", used: 0, tier });
  }

  const today = new Date().toISOString().split("T")[0];
  const usage = await db
    .prepare("SELECT count FROM usage WHERE user_id = ? AND tool_id = ? AND date = ?")
    .bind(user.id, toolId, today)
    .first();

  const used = (usage?.count as number) || 0;
  if (used >= limit) {
    return json({ allowed: false, remaining: 0, used, limit, tier });
  }

  await db
    .prepare(
      `INSERT INTO usage (user_id, tool_id, date, count) VALUES (?, ?, ?, 1)
       ON CONFLICT(user_id, tool_id, date) DO UPDATE SET count = count + 1`
    )
    .bind(user.id, toolId, today)
    .run();

  return json({ allowed: true, remaining: limit - used - 1, used: used + 1, limit, tier });
}
