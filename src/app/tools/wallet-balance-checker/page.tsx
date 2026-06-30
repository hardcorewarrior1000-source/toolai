"use client";

import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";

import { useState, useCallback } from "react";

type Chain = "solana" | "ethereum" | "bitcoin";

interface BalanceResult {
  balance: number;
  usdValue: number;
  address: string;
  chain: Chain;
}

const CHAIN_CONFIG: Record<Chain, { label: string; placeholder: string; icon: string; rpc: string; explorer: string }> = {
  solana: {
    label: "Solana",
    placeholder: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    icon: "◎",
    rpc: "https://api.mainnet-beta.solana.com",
    explorer: "https://solscan.io/account/",
  },
  ethereum: {
    label: "Ethereum",
    placeholder: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
    icon: "Ξ",
    rpc: "https://eth.llamarpc.com",
    explorer: "https://etherscan.io/address/",
  },
  bitcoin: {
    label: "Bitcoin",
    placeholder: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    icon: "₿",
    rpc: "",
    explorer: "https://blockstream.info/address/",
  },
};

export default function WalletBalanceCheckerPage() {
  const [chain, setChain] = useState<Chain>("ethereum");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<BalanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!address.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const addr = address.trim();

    try {
      let balance = 0;
      let usdValue = 0;

      if (chain === "solana") {
        const res = await fetch(CHAIN_CONFIG.solana.rpc, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "getBalance",
            params: [addr],
            id: 1,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message || "Invalid address");
        balance = (data.result?.value || 0) / 1e9;
      } else if (chain === "ethereum") {
        const res = await fetch(CHAIN_CONFIG.ethereum.rpc, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [addr, "latest"],
            id: 1,
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message || "Invalid address");
        balance = parseInt(data.result, 16) / 1e18;
      } else {
        const res = await fetch(`https://blockstream.info/api/address/${addr}`);
        if (!res.ok) throw new Error("Address not found");
        const data = await res.json();
        balance = (data.chain_stats?.funded_txo_sum || 0) / 1e8;
      }

      try {
        const priceRes = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin,ethereum&vs_currencies=usd"
        );
        const priceData = await priceRes.json();
        const coinId = chain === "solana" ? "solana" : chain === "ethereum" ? "ethereum" : "bitcoin";
        usdValue = balance * (priceData[coinId]?.usd || 0);
      } catch {}

      setResult({ balance, usdValue, address: addr, chain });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  }, [chain, address]);

  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const config = CHAIN_CONFIG[chain];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Wallet Balance Checker</h1>
      <p className="text-zinc-400 mb-8">
        Check the balance of any Solana, Ethereum, or Bitcoin wallet address.
      </p>

      <div className="flex gap-2 mb-6">
        {(["ethereum", "solana", "bitcoin"] as Chain[]).map((c) => (
          <button
            key={c}
            onClick={() => { setChain(c); setAddress(""); setResult(null); setError(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chain === c ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {CHAIN_CONFIG[c].icon} {CHAIN_CONFIG[c].label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Wallet Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => { setAddress(e.target.value); setResult(null); setError(""); }}
          placeholder={config.placeholder}
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors mb-3"
        />
        <div className="flex gap-2">
          <button
            onClick={fetchBalance}
            disabled={!address.trim() || loading}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-lg font-medium transition-colors"
          >
            {loading ? "Checking..." : "Check Balance"}
          </button>
          {address && (
            <button onClick={copy} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors">
              {copied ? "Copied!" : "Copy Address"}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{config.icon}</span>
            <div>
              <p className="text-xs text-zinc-500">{config.label} Balance</p>
              <p className="text-3xl font-bold text-white">
                {result.balance.toFixed(result.balance >= 1 ? 4 : 8)} {chain === "solana" ? "SOL" : chain === "ethereum" ? "ETH" : "BTC"}
              </p>
            </div>
          </div>
          {result.usdValue > 0 && (
            <p className="text-lg text-zinc-300 mb-4">
              ≈ ${result.usdValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </p>
          )}
          <a
            href={`${config.explorer}${result.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            View on Explorer →
          </a>
        </div>
      )}

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Supported Networks</h2>
        <div className="space-y-2 text-sm text-zinc-400">
          <p><span className="text-emerald-400 font-medium">Solana:</span> Direct RPC query — instant, no API key needed</p>
          <p><span className="text-emerald-400 font-medium">Ethereum:</span> Public RPC — works for any EVM address</p>
          <p><span className="text-emerald-400 font-medium">Bitcoin:</span> Blockstream API — shows funded transaction output sum</p>
        </div>
        <p className="text-xs text-zinc-600 mt-3">All queries run from your browser. Balance data comes from public blockchain APIs.</p>
      </div>
    </div>
  );
}
