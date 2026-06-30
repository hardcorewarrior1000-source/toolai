"use client";

import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";

import { useState, useEffect, useCallback } from "react";

interface GasData {
  low: number;
  average: number;
  high: number;
}

interface GasPrices {
  ethereum: GasData;
  polygon: GasData;
  bsc: GasData;
  fetchedAt: number;
}

const TX_TYPES = [
  { label: "ETH Transfer", gas: 21000, icon: "💸" },
  { label: "ERC-20 Transfer", gas: 65000, icon: "🪙" },
  { label: "Uniswap Swap", gas: 150000, icon: "🔄" },
  { label: "NFT Mint", gas: 120000, icon: "🎨" },
  { label: "Smart Contract Deploy", gas: 1500000, icon: "📜" },
];

const NETWORKS = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH", rpc: "https://eth.llamarpc.com" },
  { id: "polygon", name: "Polygon", symbol: "MATIC", rpc: "https://polygon-rpc.com" },
  { id: "bsc", name: "BNB Chain", symbol: "BNB", rpc: "https://bsc-dataseed.binance.org" },
];

export default function EthGasEstimatorPage() {
  const [prices, setPrices] = useState<GasPrices | null>(null);
  const [ethPrice, setEthPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [selectedTxType, setSelectedTxType] = useState(0);

  const fetchGasPrices = useCallback(async () => {
    try {
      const network = NETWORKS.find((n) => n.id === selectedNetwork)!;
      const res = await fetch(network.rpc, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "eth_gasPrice", params: [], id: 1 }),
      });
      const data = await res.json();
      const baseGas = parseInt(data.result, 16) / 1e9;

      setPrices({
        ethereum: { low: baseGas * 0.8, average: baseGas, high: baseGas * 1.5 },
        polygon: { low: baseGas * 0.8, average: baseGas, high: baseGas * 1.5 },
        bsc: { low: baseGas * 0.8, average: baseGas, high: baseGas * 1.5 },
        fetchedAt: Date.now(),
      });
      setError("");
    } catch {
      setError("Failed to fetch gas prices. The RPC may be rate-limited.");
    } finally {
      setLoading(false);
    }
  }, [selectedNetwork]);

  const fetchEthPrice = useCallback(async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,matic-network,binancecoin&vs_currencies=usd"
      );
      const data = await res.json();
      const networkPrice = selectedNetwork === "ethereum" ? data.ethereum?.usd : selectedNetwork === "polygon" ? data["matic-network"]?.usd : data.binancecoin?.usd;
      setEthPrice(networkPrice || 0);
    } catch {}
  }, [selectedNetwork]);

  useEffect(() => {
    setLoading(true);
    fetchGasPrices();
    fetchEthPrice();
    const interval = setInterval(fetchGasPrices, 30000);
    return () => clearInterval(interval);
  }, [fetchGasPrices, fetchEthPrice]);

  const network = NETWORKS.find((n) => n.id === selectedNetwork)!;
  const txType = TX_TYPES[selectedTxType];
  const currentPrices = prices?.[selectedNetwork as keyof Omit<GasPrices, "fetchedAt">];

  const costNative = (gwei: number, gas: number) => (gwei * gas) / 1e9;
  const costUsd = (gwei: number, gas: number) => costNative(gwei, gas) * ethPrice;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Gas Fee Estimator</h1>
      <p className="text-zinc-400 mb-8">
        Live gas prices for Ethereum, Polygon, and BNB Chain with USD cost estimates.
      </p>

      <div className="flex gap-2 mb-6">
        {NETWORKS.map((n) => (
          <button
            key={n.id}
            onClick={() => setSelectedNetwork(n.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedNetwork === n.id ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {n.name}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Live Gas Prices</h2>
          <span className="text-xs text-zinc-500">Auto-refresh: 30s</span>
        </div>

        {loading ? (
          <div className="text-center py-8 text-zinc-500">Fetching gas prices...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">{error}</div>
        ) : currentPrices ? (
          <div className="grid grid-cols-3 gap-4">
            {(["low", "average", "high"] as const).map((speed) => (
              <div key={speed} className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 text-center">
                <p className="text-xs text-zinc-500 mb-1 uppercase">{speed}</p>
                <p className="text-2xl font-bold text-white">{currentPrices[speed].toFixed(1)}</p>
                <p className="text-xs text-zinc-500">Gwei</p>
                {ethPrice > 0 && (
                  <p className="text-xs text-zinc-400 mt-1">
                    ~${costUsd(currentPrices[speed], txType.gas).toFixed(4)}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">Transaction Cost by Type</h2>
        <div className="space-y-2">
          {TX_TYPES.map((tx, i) => (
            <button
              key={i}
              onClick={() => setSelectedTxType(i)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                selectedTxType === i ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-zinc-950 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{tx.icon}</span>
                <span className="text-white">{tx.label}</span>
                <span className="text-zinc-500 text-xs">({tx.gas.toLocaleString()} gas)</span>
              </div>
              {currentPrices && (
                <div className="text-right">
                  <span className="text-zinc-300">
                    {costNative(currentPrices.average, tx.gas).toFixed(6)} {network.symbol}
                  </span>
                  {ethPrice > 0 && (
                    <span className="text-zinc-500 ml-2">
                      ~${costUsd(currentPrices.average, tx.gas).toFixed(2)}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">What Are Gas Fees?</h2>
        <div className="space-y-2 text-sm text-zinc-400">
          <p>Gas fees are the costs of executing transactions on EVM-compatible blockchains. They are paid to validators/ miners for processing your transaction.</p>
          <p><span className="text-emerald-400 font-medium">Gwei:</span> The unit used to measure gas price. 1 Gwei = 0.000000001 ETH.</p>
          <p><span className="text-emerald-400 font-medium">Gas Limit:</span> The maximum gas you&apos;re willing to use. More complex operations require more gas.</p>
          <p><span className="text-emerald-400 font-medium">Tip:</span> Gas prices fluctuate with network demand. Transacting during off-peak hours (weekends, late night UTC) often saves money.</p>
        </div>
      </div>
    </div>
  );
}
