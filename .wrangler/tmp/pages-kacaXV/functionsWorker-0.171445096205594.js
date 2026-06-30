var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/_shared.ts
var ORIGIN = "https://toolai.zelve.xyz";
var CORS = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS, ...extra }
  });
}
__name(json, "json");
async function hashPw(pw, salt) {
  const enc = new TextEncoder();
  if (!salt) {
    const s = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(s).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const key = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 1e5, hash: "SHA-256" },
    key,
    256
  );
  return salt + ":" + Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(hashPw, "hashPw");
async function verifyPw(pw, stored) {
  return await hashPw(pw, stored.split(":")[0]) === stored;
}
__name(verifyPw, "verifyPw");
function genToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32))).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(genToken, "genToken");
async function getUser(request, env) {
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/session=([a-f0-9]+)/);
  if (!m) return null;
  const db = env?.toolai_auth;
  if (!db) return null;
  const sess = await db.prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?").bind(m[1]).first();
  if (!sess) return null;
  if (new Date(sess.expires_at) < /* @__PURE__ */ new Date()) return null;
  return await db.prepare("SELECT id, email FROM users WHERE id = ?").bind(sess.user_id).first();
}
__name(getUser, "getUser");
function handleOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
__name(handleOptions, "handleOptions");

// api/auth/login.ts
var onRequestOptions = handleOptions;
async function onRequestPost(ctx) {
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);
  const { email, password } = await ctx.request.json();
  if (!email || !password) return json({ error: "Email and password required" }, 400);
  const user = await db.prepare("SELECT id, email, password_hash FROM users WHERE email = ?").bind(email.toLowerCase()).first();
  if (!user) return json({ error: "Invalid credentials" }, 401);
  const valid = await verifyPw(password, user.password_hash);
  if (!valid) return json({ error: "Invalid credentials" }, 401);
  const token = genToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString();
  await db.prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)").bind(user.id, token, expiresAt).run();
  return json({ ok: true, email: user.email }, 200, {
    "Set-Cookie": "session=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000"
  });
}
__name(onRequestPost, "onRequestPost");

// api/auth/logout.ts
var onRequestOptions2 = handleOptions;
async function onRequestPost2(ctx) {
  const cookie = ctx.request.headers.get("Cookie") || "";
  const m = cookie.match(/session=([a-f0-9]+)/);
  if (m && ctx.env?.toolai_auth) {
    await ctx.env.toolai_auth.prepare("DELETE FROM sessions WHERE token = ?").bind(m[1]).run();
  }
  return json({ ok: true }, 200, {
    "Set-Cookie": "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"
  });
}
__name(onRequestPost2, "onRequestPost");

// api/auth/me.ts
var onRequestOptions3 = handleOptions;
async function onRequestGet(ctx) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);
  const db = ctx.env?.toolai_auth;
  const license = await db.prepare("SELECT key, tier, chain, activated_at, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(user.id).first();
  const isActive = license && new Date(license.expires_at) > /* @__PURE__ */ new Date();
  return json({
    email: user.email,
    tier: isActive ? license.tier : "free",
    license: isActive ? {
      key: license.key,
      tier: license.tier,
      chain: license.chain,
      activatedAt: license.activated_at,
      expiresAt: license.expires_at
    } : null
  });
}
__name(onRequestGet, "onRequestGet");

// api/auth/signup.ts
var onRequestOptions4 = handleOptions;
async function onRequestPost3(ctx) {
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
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString();
  await db.prepare("INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)").bind(userId, token, expiresAt).run();
  return json({ ok: true, email: email.toLowerCase() }, 200, {
    "Set-Cookie": "session=" + token + "; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000"
  });
}
__name(onRequestPost3, "onRequestPost");

// api/license/activate.ts
var WALLETS = {
  solana: "BeS2p6srqB11aTAKCFazCTsCwhpeCZwQtfbBqegp3LsT",
  ethereum: "0xAD99329d02c2cD485Dc86EF0E6FbaDCB0702b551",
  bitcoin: "bc1q3h9a3q4axug2csc68858mnjtpqpv0zl9f930jr"
};
var VALID_TIERS = ["starter", "pro", "business", "enterprise"];
async function fetchSolanaTx(txHash) {
  try {
    const res = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: [
          txHash,
          { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }
        ]
      })
    });
    const data = await res.json();
    if (!data.result) return { success: false, error: "Transaction not found" };
    if (data.result.meta?.err) return { success: false, error: "Transaction failed" };
    const msg = data.result.transaction?.message;
    const accounts = msg?.accountKeys || [];
    const sentToOurWallet = accounts.some(
      (a) => typeof a === "string" ? a === WALLETS.solana.address : a?.pubkey === WALLETS.solana.address
    );
    if (!sentToOurWallet) return { success: false, error: "Payment was not sent to our wallet" };
    const lamports = data.result.meta?.preBalances?.[0] !== void 0 ? Math.abs(
      (data.result.meta.postBalances?.[0] || 0) - (data.result.meta.preBalances?.[0] || 0)
    ) : 0;
    const sol = lamports / 1e9;
    const tier = detectTier(sol, 150);
    return { success: true, tier, amount: sol };
  } catch {
    return { success: false, error: "Failed to verify Solana transaction" };
  }
}
__name(fetchSolanaTx, "fetchSolanaTx");
async function fetchEthereumTx(txHash) {
  try {
    const res = await fetch("https://eth.llamarpc.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionByHash",
        params: [txHash]
      })
    });
    const data = await res.json();
    if (!data.result) return { success: false, error: "Transaction not found" };
    if (data.result.blockNumber === null) return { success: false, error: "Transaction pending" };
    const toAddr = data.result.to?.toLowerCase();
    if (toAddr !== WALLETS.ethereum.toLowerCase())
      return { success: false, error: "Payment was not sent to our wallet" };
    const value = parseInt(data.result.value, 16) / 1e18;
    const tier = detectTier(value, 2500);
    return { success: true, tier, amount: value };
  } catch {
    return { success: false, error: "Failed to verify Ethereum transaction" };
  }
}
__name(fetchEthereumTx, "fetchEthereumTx");
async function fetchBitcoinTx(txHash) {
  try {
    const res = await fetch(`https://blockstream.info/api/tx/${txHash}`);
    if (!res.ok) return { success: false, error: "Transaction not found" };
    const data = await res.json();
    if (data.status?.confirmed === false) return { success: false, error: "Transaction pending" };
    const sentToOurWallet = data.vout?.some(
      (out) => out.scriptpubkey_address === WALLETS.bitcoin
    );
    if (!sentToOurWallet) return { success: false, error: "Payment was not sent to our wallet" };
    const value = data.vout?.reduce(
      (sum, out) => sum + out.value,
      0
    ) / 1e8;
    const tier = detectTier(value || 0, 6e4);
    return { success: true, tier, amount: value };
  } catch {
    return { success: false, error: "Failed to verify Bitcoin transaction" };
  }
}
__name(fetchBitcoinTx, "fetchBitcoinTx");
function detectTier(amount, pricePerUnit) {
  const usdValue = amount * pricePerUnit;
  if (usdValue >= 98) return "enterprise";
  if (usdValue >= 44) return "business";
  if (usdValue >= 14) return "pro";
  if (usdValue >= 4) return "starter";
  return "free";
}
__name(detectTier, "detectTier");
async function verifyOnChain(txHash, chain) {
  switch (chain) {
    case "solana":
      return fetchSolanaTx(txHash);
    case "ethereum":
      return fetchEthereumTx(txHash);
    case "bitcoin":
      return fetchBitcoinTx(txHash);
    default:
      return { success: false, error: "Unsupported chain" };
  }
}
__name(verifyOnChain, "verifyOnChain");
function genKey(txHash, tier) {
  let h = 0;
  const combined = txHash + tier;
  for (let i = 0; i < combined.length; i++) {
    h = (h << 5) - h + combined.charCodeAt(i);
    h = h & h;
  }
  const hex = Math.abs(h).toString(16).padStart(8, "0");
  const extra = txHash.slice(0, 8).toUpperCase();
  return "TOOLAI-" + hex.slice(0, 4).toUpperCase() + "-" + hex.slice(4, 8).toUpperCase() + "-" + extra.slice(0, 4) + "-" + extra.slice(4, 8);
}
__name(genKey, "genKey");
var onRequestOptions5 = handleOptions;
async function onRequestPost4(ctx) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);
  const { txHash, chain, tier } = await ctx.request.json();
  if (!txHash || !chain || !tier) return json({ error: "Missing fields" }, 400);
  if (!VALID_TIERS.includes(tier)) return json({ error: "Invalid tier" }, 400);
  const existing = await db.prepare("SELECT id FROM licenses WHERE tx_hash = ? AND chain = ?").bind(txHash, chain).first();
  if (existing) return json({ error: "Transaction already used" }, 409);
  const verification = await verifyOnChain(txHash.trim(), chain);
  if (!verification.success) {
    return json({ error: verification.error || "Verification failed" }, 400);
  }
  if (verification.tier === "free") {
    return json({ error: "Transaction amount too low for any tier" }, 400);
  }
  const tiers = ["starter", "pro", "business", "enterprise"];
  const requestedTierIdx = tiers.indexOf(tier);
  const verifiedTierIdx = tiers.indexOf(verification.tier || "free");
  if (requestedTierIdx > verifiedTierIdx) {
    return json({
      error: `Insufficient payment. Detected tier: ${verification.tier}. You requested: ${tier}.`
    }, 400);
  }
  const key = genKey(txHash, tier);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString();
  await db.prepare(
    "INSERT INTO licenses (user_id, key, tier, tx_hash, chain, expires_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(user.id, key, tier, txHash, chain, expiresAt).run();
  return json({ ok: true, key, tier, expiresAt });
}
__name(onRequestPost4, "onRequestPost");

// api/license/master.ts
var MASTER_KEY = "ZELVE-MASTER-2026";
var onRequestOptions6 = handleOptions;
async function onRequestPost5(ctx) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);
  const { key } = await ctx.request.json();
  if (!key) return json({ error: "Key required" }, 400);
  if (key.trim() !== MASTER_KEY) {
    return json({ error: "Invalid master key" }, 400);
  }
  const existing = await db.prepare("SELECT id FROM licenses WHERE user_id = ? AND tier = 'enterprise' AND expires_at > datetime('now')").bind(user.id).first();
  if (existing) {
    return json({ ok: true, message: "Already activated", tier: "enterprise" });
  }
  const expiresAt = new Date(Date.now() + 365 * 10 * 24 * 60 * 60 * 1e3).toISOString();
  const key_ = "ZELVE-MASTER-LIFETIME";
  await db.prepare("INSERT INTO licenses (user_id, key, tier, tx_hash, chain, expires_at) VALUES (?, ?, ?, ?, ?, ?)").bind(user.id, key_, "enterprise", "master-key", "master", expiresAt).run();
  return json({ ok: true, tier: "enterprise", expiresAt });
}
__name(onRequestPost5, "onRequestPost");

// api/license/track.ts
var ALL_UNLIMITED = {
  "password-generator": "unlimited",
  "json-formatter": "unlimited",
  "word-counter": "unlimited",
  "text-to-slug": "unlimited",
  "gradient-generator": "unlimited",
  "image-to-base64": "unlimited",
  "crypto-address-validator": "unlimited",
  "crypto-unit-converter": "unlimited",
  "mnemonic-generator": "unlimited",
  "crypto-payment-link": "unlimited"
};
var TIER_LIMITS = {
  free: {
    "ai-humanizer": 2500,
    "ai-chatbot": 2500,
    "color-palette": 2500,
    "image-to-prompt": 2500,
    "qr-generator": 2500,
    "crypto-price-calculator": 2500,
    "eth-gas-estimator": 2500,
    "wallet-balance-checker": 2500,
    ...ALL_UNLIMITED
  },
  starter: {
    "ai-humanizer": 1e5,
    "ai-chatbot": 1e5,
    "color-palette": 1e5,
    "image-to-prompt": 1e5,
    "qr-generator": 1e5,
    "crypto-price-calculator": 1e5,
    "eth-gas-estimator": 1e5,
    "wallet-balance-checker": 1e5,
    ...ALL_UNLIMITED
  },
  pro: {
    "ai-humanizer": "unlimited",
    "ai-chatbot": "unlimited",
    "color-palette": "unlimited",
    "image-to-prompt": "unlimited",
    "qr-generator": "unlimited",
    "crypto-price-calculator": "unlimited",
    "eth-gas-estimator": "unlimited",
    "wallet-balance-checker": "unlimited",
    ...ALL_UNLIMITED
  },
  business: {
    "ai-humanizer": "unlimited",
    "ai-chatbot": "unlimited",
    "color-palette": "unlimited",
    "image-to-prompt": "unlimited",
    "qr-generator": "unlimited",
    "crypto-price-calculator": "unlimited",
    "eth-gas-estimator": "unlimited",
    "wallet-balance-checker": "unlimited",
    ...ALL_UNLIMITED
  },
  enterprise: {
    "ai-humanizer": "unlimited",
    "ai-chatbot": "unlimited",
    "color-palette": "unlimited",
    "image-to-prompt": "unlimited",
    "qr-generator": "unlimited",
    "crypto-price-calculator": "unlimited",
    "eth-gas-estimator": "unlimited",
    "wallet-balance-checker": "unlimited",
    ...ALL_UNLIMITED
  }
};
var onRequestOptions7 = handleOptions;
async function onRequestPost6(ctx) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);
  const { toolId } = await ctx.request.json();
  if (!toolId) return json({ error: "Missing toolId" }, 400);
  const license = await db.prepare("SELECT tier, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(user.id).first();
  const tier = license && new Date(license.expires_at) > /* @__PURE__ */ new Date() ? license.tier : "free";
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  const limit = limits[toolId] ?? 5;
  if (limit === "unlimited") {
    await db.prepare(
      `INSERT INTO usage (user_id, tool_id, date, count) VALUES (?, ?, ?, 1)
         ON CONFLICT(user_id, tool_id, date) DO UPDATE SET count = count + 1`
    ).bind(user.id, toolId, (/* @__PURE__ */ new Date()).toISOString().split("T")[0]).run();
    return json({ allowed: true, remaining: "unlimited", used: 0, tier });
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const usage = await db.prepare("SELECT count FROM usage WHERE user_id = ? AND tool_id = ? AND date = ?").bind(user.id, toolId, today).first();
  const used = usage?.count || 0;
  if (used >= limit) {
    return json({ allowed: false, remaining: 0, used, limit, tier });
  }
  await db.prepare(
    `INSERT INTO usage (user_id, tool_id, date, count) VALUES (?, ?, ?, 1)
       ON CONFLICT(user_id, tool_id, date) DO UPDATE SET count = count + 1`
  ).bind(user.id, toolId, today).run();
  return json({ allowed: true, remaining: limit - used - 1, used: used + 1, limit, tier });
}
__name(onRequestPost6, "onRequestPost");

// api/license/validate.ts
var onRequestOptions8 = handleOptions;
async function onRequestGet2(ctx) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ tier: "free", valid: false });
  const db = ctx.env?.toolai_auth;
  if (!db) return json({ tier: "free", valid: false });
  const license = await db.prepare("SELECT tier, expires_at FROM licenses WHERE user_id = ? ORDER BY id DESC LIMIT 1").bind(user.id).first();
  if (!license || new Date(license.expires_at) < /* @__PURE__ */ new Date()) {
    return json({ tier: "free", valid: false });
  }
  return json({
    tier: license.tier,
    valid: true,
    expiresAt: license.expires_at
  });
}
__name(onRequestGet2, "onRequestGet");

// api/health.ts
async function onRequest() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
__name(onRequest, "onRequest");

// ../.wrangler/tmp/pages-kacaXV/functionsRoutes-0.1254198825706765.mjs
var routes = [
  {
    routePath: "/api/auth/login",
    mountPath: "/api/auth",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/auth/login",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/auth/logout",
    mountPath: "/api/auth",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  },
  {
    routePath: "/api/auth/logout",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/auth/me",
    mountPath: "/api/auth",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/auth/me",
    mountPath: "/api/auth",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions3]
  },
  {
    routePath: "/api/auth/signup",
    mountPath: "/api/auth",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions4]
  },
  {
    routePath: "/api/auth/signup",
    mountPath: "/api/auth",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/license/activate",
    mountPath: "/api/license",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions5]
  },
  {
    routePath: "/api/license/activate",
    mountPath: "/api/license",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/license/master",
    mountPath: "/api/license",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions6]
  },
  {
    routePath: "/api/license/master",
    mountPath: "/api/license",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/license/track",
    mountPath: "/api/license",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions7]
  },
  {
    routePath: "/api/license/track",
    mountPath: "/api/license",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  },
  {
    routePath: "/api/license/validate",
    mountPath: "/api/license",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/license/validate",
    mountPath: "/api/license",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions8]
  },
  {
    routePath: "/api/health",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
