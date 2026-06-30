import { json, getUser, handleOptions } from "../_shared";

const WALLETS = {
  solana: "BeS2p6srqB11aTAKCFazCTsCwhpeCZwQtfbBqegp3LsT",
  ethereum: "0xAD99329d02c2cD485Dc86EF0E6FbaDCB0702b551",
  bitcoin: "bc1q3h9a3q4axug2csc68858mnjtpqpv0zl9f930jr",
};

const TIER_USD: Record<string, number> = {
  starter: 5,
  pro: 15,
  business: 45,
  enterprise: 99,
};

const VALID_TIERS = ["starter", "pro", "business", "enterprise"];

interface VerifyResult {
  success: boolean;
  tier?: string;
  amount?: number;
  error?: string;
}

async function fetchSolanaTx(txHash: string): Promise<VerifyResult> {
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
          { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
        ],
      }),
    });
    const data = await res.json();
    if (!data.result) return { success: false, error: "Transaction not found" };
    if (data.result.meta?.err) return { success: false, error: "Transaction failed" };

    const msg = data.result.transaction?.message;
    const accounts = msg?.accountKeys || [];
    const sentToOurWallet = accounts.some(
      (a: { pubkey?: string } | string) =>
        typeof a === "string" ? a === WALLETS.solana.address : a?.pubkey === WALLETS.solana.address
    );
    if (!sentToOurWallet) return { success: false, error: "Payment was not sent to our wallet" };

    const lamports =
      data.result.meta?.preBalances?.[0] !== undefined
        ? Math.abs(
            (data.result.meta.postBalances?.[0] || 0) -
              (data.result.meta.preBalances?.[0] || 0)
          )
        : 0;
    const sol = lamports / 1_000_000_000;
    const tier = detectTier(sol, 150);
    return { success: true, tier, amount: sol };
  } catch {
    return { success: false, error: "Failed to verify Solana transaction" };
  }
}

async function fetchEthereumTx(txHash: string): Promise<VerifyResult> {
  try {
    const res = await fetch("https://eth.llamarpc.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionByHash",
        params: [txHash],
      }),
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

async function fetchBitcoinTx(txHash: string): Promise<VerifyResult> {
  try {
    const res = await fetch(`https://blockstream.info/api/tx/${txHash}`);
    if (!res.ok) return { success: false, error: "Transaction not found" };
    const data = await res.json();
    if (data.status?.confirmed === false) return { success: false, error: "Transaction pending" };

    const sentToOurWallet = data.vout?.some(
      (out: { scriptpubkey_address?: string }) =>
        out.scriptpubkey_address === WALLETS.bitcoin
    );
    if (!sentToOurWallet) return { success: false, error: "Payment was not sent to our wallet" };

    const value = data.vout?.reduce(
      (sum: number, out: { value: number }) => sum + out.value,
      0
    ) / 1e8;
    const tier = detectTier(value || 0, 60000);
    return { success: true, tier, amount: value };
  } catch {
    return { success: false, error: "Failed to verify Bitcoin transaction" };
  }
}

function detectTier(amount: number, pricePerUnit: number): string {
  const usdValue = amount * pricePerUnit;
  if (usdValue >= 98) return "enterprise";
  if (usdValue >= 44) return "business";
  if (usdValue >= 14) return "pro";
  if (usdValue >= 4) return "starter";
  return "free";
}

async function verifyOnChain(txHash: string, chain: string): Promise<VerifyResult> {
  switch (chain) {
    case "solana": return fetchSolanaTx(txHash);
    case "ethereum": return fetchEthereumTx(txHash);
    case "bitcoin": return fetchBitcoinTx(txHash);
    default: return { success: false, error: "Unsupported chain" };
  }
}

function genKey(txHash: string, tier: string): string {
  let h = 0;
  const combined = txHash + tier;
  for (let i = 0; i < combined.length; i++) {
    h = ((h << 5) - h) + combined.charCodeAt(i);
    h = h & h;
  }
  const hex = Math.abs(h).toString(16).padStart(8, "0");
  const extra = txHash.slice(0, 8).toUpperCase();
  return "TOOLAI-" + hex.slice(0, 4).toUpperCase() + "-" + hex.slice(4, 8).toUpperCase() + "-" + extra.slice(0, 4) + "-" + extra.slice(4, 8);
}

export const onRequestOptions = handleOptions;

export async function onRequestPost(ctx: { request: Request; env: { toolai_auth?: D1Database } }) {
  const user = await getUser(ctx.request, ctx.env);
  if (!user) return json({ error: "Not logged in" }, 401);

  const db = ctx.env?.toolai_auth;
  if (!db) return json({ error: "DB not configured" }, 500);

  const { txHash, chain, tier } = await ctx.request.json();
  if (!txHash || !chain || !tier) return json({ error: "Missing fields" }, 400);

  if (!VALID_TIERS.includes(tier)) return json({ error: "Invalid tier" }, 400);

  const existing = await db
    .prepare("SELECT id FROM licenses WHERE tx_hash = ? AND chain = ?")
    .bind(txHash, chain)
    .first();
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
      error: `Insufficient payment. Detected tier: ${verification.tier}. You requested: ${tier}.`,
    }, 400);
  }

  const key = genKey(txHash, tier);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await db
    .prepare(
      "INSERT INTO licenses (user_id, key, tier, tx_hash, chain, expires_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(user.id, key, tier, txHash, chain, expiresAt)
    .run();

  return json({ ok: true, key, tier, expiresAt });
}
