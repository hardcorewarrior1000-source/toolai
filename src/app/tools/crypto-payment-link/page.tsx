"use client";

import { useState } from "react";

type Chain = "bitcoin" | "ethereum" | "solana";

interface ChainConfig {
  label: string;
  placeholder: string;
  uriPrefix: string;
  amountLabel: string;
}

const CHAIN_CONFIG: Record<Chain, ChainConfig> = {
  bitcoin: {
    label: "Bitcoin (BTC)",
    placeholder: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    uriPrefix: "bitcoin",
    amountLabel: "Amount (BTC)",
  },
  ethereum: {
    label: "Ethereum (ETH)",
    placeholder: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
    uriPrefix: "ethereum",
    amountLabel: "Amount (ETH)",
  },
  solana: {
    label: "Solana (SOL)",
    placeholder: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    uriPrefix: "solana",
    amountLabel: "Amount (SOL)",
  },
};

export default function CryptoPaymentLinkPage() {
  const [chain, setChain] = useState<Chain>("bitcoin");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const config = CHAIN_CONFIG[chain];

  const buildUri = (): string => {
    if (!address.trim()) return "";
    const addr = address.trim();
    const params: string[] = [];

    if (chain === "bitcoin") {
      if (amount) params.push(`amount=${amount}`);
      if (memo) params.push(`message=${encodeURIComponent(memo)}`);
      return `bitcoin:${addr}${params.length ? "?" + params.join("&") : ""}`;
    }
    if (chain === "ethereum") {
      if (amount) {
        try {
          const wei = BigInt(Math.round(parseFloat(amount) * 1e18));
          params.push(`value=${wei}`);
        } catch {}
      }
      if (memo) params.push(`memo=${encodeURIComponent(memo)}`);
      return `ethereum:${addr}${params.length ? "?" + params.join("&") : ""}`;
    }
    if (amount) params.push(`amount=${amount}`);
    if (memo) params.push(`memo=${encodeURIComponent(memo)}`);
    return `solana:${addr}${params.length ? "?" + params.join("&") : ""}`;
  };

  const uri = buildUri();

  const copy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Crypto Payment Link Generator</h1>
      <p className="text-zinc-400 mb-8">
        Create BIP21 and EIP-681 payment URIs for Bitcoin, Ethereum, and Solana.
      </p>

      <div className="flex gap-2 mb-6">
        {(["bitcoin", "ethereum", "solana"] as Chain[]).map((c) => (
          <button
            key={c}
            onClick={() => { setChain(c); setAddress(""); setAmount(""); setMemo(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chain === c ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {CHAIN_CONFIG[c].label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Wallet Address *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={config.placeholder}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">{config.amountLabel}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.001"
            step="any"
            min="0"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Memo / Note (optional)</label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Payment for order #123"
            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      {uri && (
        <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Generated Payment URI</h2>

          <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 mb-4">
            <p className="font-mono text-sm text-emerald-400 break-all">{uri}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => copy("uri", uri)}
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {copiedField === "uri" ? "Copied!" : "Copy URI"}
            </button>
            <button
              onClick={() => copy("address", address)}
              className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors"
            >
              {copiedField === "address" ? "Copied!" : "Copy Address Only"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">URI Formats</h2>
        <div className="space-y-2 text-sm text-zinc-400">
          <p><span className="text-emerald-400 font-medium">Bitcoin (BIP21):</span> <code className="text-zinc-300">bitcoin:ADDRESS?amount=0.001&amp;message=...</code></p>
          <p><span className="text-emerald-400 font-medium">Ethereum (EIP-681):</span> <code className="text-zinc-300">ethereum:ADDRESS?value=WEI_AMOUNT&amp;memo=...</code></p>
          <p><span className="text-emerald-400 font-medium">Solana:</span> <code className="text-zinc-300">solana:ADDRESS?amount=0.5&amp;memo=...</code></p>
        </div>
      </div>
    </div>
  );
}
