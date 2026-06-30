export type Chain = "solana" | "ethereum" | "bitcoin";

export const WALLETS: Record<Chain, { address: string; label: string; icon: string }> = {
  solana: {
    address: "BeS2p6srqB11aTAKCFazCTsCwhpeCZwQtfbBqegp3LsT",
    label: "SOL",
    icon: "\u25CE",
  },
  ethereum: {
    address: "0xAD99329d02c2cD485Dc86EF0E6FbaDCB0702b551",
    label: "ETH",
    icon: "\u039E",
  },
  bitcoin: {
    address: "bc1q3h9a3q4axug2csc68858mnjtpqpv0zl9f930jr",
    label: "BTC",
    icon: "\u20BF",
  },
};

export const TIER_USD: Record<string, number> = {
  starter: 5,
  pro: 15,
  business: 45,
  enterprise: 99,
};
