export type Chain = "solana" | "ethereum" | "bitcoin";

export const WALLETS: Record<Chain, { address: string; label: string; icon: string; usdPrice: number }> = {
  solana: {
    address: "BeS2p6srqB11aTAKCFazCTsCwhpeCZwQtfbBqegp3LsT",
    label: "SOL",
    icon: "◎",
    usdPrice: 0.0055,
  },
  ethereum: {
    address: "0xAD99329d02c2cD485Dc86EF0E6FbaDCB0702b551",
    label: "ETH",
    icon: "Ξ",
    usdPrice: 0.00033,
  },
  bitcoin: {
    address: "bc1q3h9a3q4axug2csc68858mnjtpqpv0zl9f930jr",
    label: "BTC",
    icon: "₿",
    usdPrice: 0.0000167,
  },
};

export interface VerifyResult {
  success: boolean;
  tier?: string;
  amount?: number;
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
    const lamports = data.result.meta?.preBalances?.[0] !== undefined
      ? Math.abs((data.result.meta.postBalances?.[0] || 0) - (data.result.meta.preBalances?.[0] || 0))
      : 0;
    const sol = lamports / 1_000_000_000;
    return { success: true, tier: detectTier(sol, "solana"), amount: sol, confirmations: 1 };
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
    if (data.result.blockNumber === null) return { success: false, error: "Transaction pending" };
    const value = parseInt(data.result.value, 16) / 1e18;
    return { success: true, tier: detectTier(value, "ethereum"), amount: value, confirmations: 1 };
  } catch {
    return { success: false, error: "Failed to verify Ethereum transaction" };
  }
}

export async function verifyBitcoin(txHash: string): Promise<VerifyResult> {
  try {
    const res = await fetch(`https://blockstream.info/api/tx/${txHash}`);
    if (!res.ok) return { success: false, error: "Transaction not found" };
    const data = await res.json();
    if (data.status?.confirmed === false) return { success: false, error: "Transaction pending" };
    const value = data.vout?.reduce((sum: number, out: { value: number }) => sum + out.value, 0) / 1e8;
    return { success: true, tier: detectTier(value || 0, "bitcoin"), amount: value, confirmations: 1 };
  } catch {
    return { success: false, error: "Failed to verify Bitcoin transaction" };
  }
}

function detectTier(amount: number, chain: Chain): string {
  const usdThresholds: Record<string, number[]> = {
    starter: [4],
    pro: [14],
    business: [44],
    enterprise: [98],
  };

  const chainUsd = WALLETS[chain].usdPrice;
  if (chainUsd === 0) return "free";
  const usdValue = amount / chainUsd;

  if (usdValue >= usdThresholds.enterprise[0]) return "enterprise";
  if (usdValue >= usdThresholds.business[0]) return "business";
  if (usdValue >= usdThresholds.pro[0]) return "pro";
  if (usdValue >= usdThresholds.starter[0]) return "starter";
  return "free";
}

export async function verifyTransaction(txHash: string, chain: Chain): Promise<VerifyResult> {
  switch (chain) {
    case "solana": return verifySolana(txHash);
    case "ethereum": return verifyEthereum(txHash);
    case "bitcoin": return verifyBitcoin(txHash);
    default: return { success: false, error: "Unsupported chain" };
  }
}

export function getAmountForTier(tierId: string, chain: Chain): string {
  const tierPrices: Record<string, number> = {
    starter: 5,
    pro: 15,
    business: 45,
    enterprise: 99,
  };
  const usd = tierPrices[tierId] || 0;
  const unitPrice = WALLETS[chain].usdPrice;
  if (unitPrice === 0) return "0";
  const amount = usd * unitPrice;
  return amount < 0.001 ? amount.toExponential(4) : amount.toFixed(6);
}
