import { WALLETS, TIER_USD, type Chain } from "./wallets";

export type { Chain };
export { WALLETS, TIER_USD };

interface LivePrices {
  solana: number;
  ethereum: number;
  bitcoin: number;
  fetchedAt: number;
}

let cached: LivePrices | null = null;
const CACHE_MS = 5 * 60 * 1000;

export async function fetchLivePrices(): Promise<LivePrices> {
  if (cached && Date.now() - cached.fetchedAt < CACHE_MS) return cached;
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin,ethereum&vs_currencies=usd"
    );
    const data = await res.json();
    cached = {
      solana: data.solana?.usd || 0,
      ethereum: data.ethereum?.usd || 0,
      bitcoin: data.bitcoin?.usd || 0,
      fetchedAt: Date.now(),
    };
  } catch {
    if (!cached) {
      cached = { solana: 100, ethereum: 2500, bitcoin: 60000, fetchedAt: 0 };
    }
  }
  return cached;
}

export async function getAmountForTier(tierId: string, chain: Chain): Promise<string> {
  const prices = await fetchLivePrices();
  const usd = TIER_USD[tierId] || 0;
  const pricePerUnit = prices[chain];
  if (!pricePerUnit) return "0";
  const amount = usd / pricePerUnit;
  return amount < 0.0001 ? amount.toExponential(4) : amount.toFixed(6);
}

export async function getAmountForTierFormatted(
  tierId: string,
  chain: Chain
): Promise<{ crypto: string; usd: number; unit: string }> {
  const prices = await fetchLivePrices();
  const usd = TIER_USD[tierId] || 0;
  const pricePerUnit = prices[chain];
  if (!pricePerUnit) return { crypto: "0", usd, unit: WALLETS[chain].label };
  const amount = usd / pricePerUnit;
  const crypto = amount < 0.0001 ? amount.toExponential(4) : amount.toFixed(6);
  return { crypto, usd, unit: WALLETS[chain].label };
}

export async function detectTierFromTx(amount: number, chain: Chain): Promise<string> {
  const prices = await fetchLivePrices();
  const pricePerUnit = prices[chain];
  if (!pricePerUnit) return "free";
  const usdValue = amount * pricePerUnit;

  if (usdValue >= 98) return "enterprise";
  if (usdValue >= 44) return "business";
  if (usdValue >= 14) return "pro";
  if (usdValue >= 4) return "starter";
  return "free";
}

export interface VerifyResult {
  success: boolean;
  tier?: string;
  amount?: number;
  usdValue?: number;
  confirmations?: number;
  error?: string;
}

export async function verifySolana(txHash: string): Promise<VerifyResult> {
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
    const toIdx = accounts.findIndex(
      (a: { pubkey?: string; toString?: () => string } | string) =>
        typeof a === "string" ? a === WALLETS.solana.address : a?.pubkey === WALLETS.solana.address
    );
    if (toIdx === -1) return { success: false, error: "Payment was not sent to our wallet" };

    const lamports =
      data.result.meta?.preBalances?.[0] !== undefined
        ? Math.abs(
            (data.result.meta.postBalances?.[0] || 0) -
              (data.result.meta.preBalances?.[0] || 0)
          )
        : 0;
    const sol = lamports / 1_000_000_000;
    const prices = await fetchLivePrices();
    const usdValue = sol * prices.solana;
    return {
      success: true,
      tier: await detectTierFromTx(sol, "solana"),
      amount: sol,
      usdValue,
      confirmations: 1,
    };
  } catch {
    return { success: false, error: "Failed to verify Solana transaction" };
  }
}

export async function verifyEthereum(txHash: string): Promise<VerifyResult> {
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
    if (data.result.blockNumber === null)
      return { success: false, error: "Transaction pending" };

    const toAddr = data.result.to?.toLowerCase();
    if (toAddr !== WALLETS.ethereum.address.toLowerCase())
      return { success: false, error: "Payment was not sent to our wallet" };

    const value = parseInt(data.result.value, 16) / 1e18;
    const prices = await fetchLivePrices();
    const usdValue = value * prices.ethereum;
    return {
      success: true,
      tier: await detectTierFromTx(value, "ethereum"),
      amount: value,
      usdValue,
      confirmations: 1,
    };
  } catch {
    return { success: false, error: "Failed to verify Ethereum transaction" };
  }
}

export async function verifyBitcoin(txHash: string): Promise<VerifyResult> {
  try {
    const res = await fetch(`https://blockstream.info/api/tx/${txHash}`);
    if (!res.ok) return { success: false, error: "Transaction not found" };
    const data = await res.json();
    if (data.status?.confirmed === false)
      return { success: false, error: "Transaction pending" };

    const sentToOurWallet = data.vout?.some(
      (out: { scriptpubkey_address?: string }) =>
        out.scriptpubkey_address === WALLETS.bitcoin.address
    );
    if (!sentToOurWallet)
      return { success: false, error: "Payment was not sent to our wallet" };

    const value =
      data.vout?.reduce(
        (sum: number, out: { value: number }) => sum + out.value,
        0
      ) / 1e8;
    const prices = await fetchLivePrices();
    const usdValue = (value || 0) * prices.bitcoin;
    return {
      success: true,
      tier: await detectTierFromTx(value || 0, "bitcoin"),
      amount: value,
      usdValue,
      confirmations: 1,
    };
  } catch {
    return { success: false, error: "Failed to verify Bitcoin transaction" };
  }
}

export async function verifyTransaction(
  txHash: string,
  chain: Chain
): Promise<VerifyResult> {
  switch (chain) {
    case "solana":
      return verifySolana(txHash);
    case "ethereum":
      return verifyEthereum(txHash);
    case "bitcoin":
      return verifyBitcoin(txHash);
    default:
      return { success: false, error: "Unsupported chain" };
  }
}
