"use client";

import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";

import { useState, useEffect, useCallback } from "react";

const COINS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", icon: "₿" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", icon: "Ξ" },
  { id: "solana", symbol: "SOL", name: "Solana", icon: "◎" },
  { id: "binancecoin", symbol: "BNB", name: "BNB", icon: "◆" },
  { id: "ripple", symbol: "XRP", name: "XRP", icon: "✕" },
  { id: "cardano", symbol: "ADA", name: "Cardano", icon: "◇" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin", icon: "Ð" },
  { id: "polkadot", symbol: "DOT", name: "Polkadot", icon: "●" },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", icon: "▲" },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", icon: "⬡" },
];

const FIATS = [
  { id: "usd", symbol: "$", name: "USD" },
  { id: "eur", symbol: "€", name: "EUR" },
  { id: "gbp", symbol: "£", name: "GBP" },
  { id: "jpy", symbol: "¥", name: "JPY" },
  { id: "thb", symbol: "฿", name: "THB" },
  { id: "aud", symbol: "A$", name: "AUD" },
  { id: "cad", symbol: "C$", name: "CAD" },
];

interface Prices {
  [coinId: string]: { [fiat: string]: number };
}

export default function CryptoPriceCalculatorPage() {
  const [prices, setPrices] = useState<Prices>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [selectedFiat, setSelectedFiat] = useState("usd");
  const [cryptoAmount, setCryptoAmount] = useState("1");
  const [fiatAmount, setFiatAmount] = useState("");
  const [activeField, setActiveField] = useState<"crypto" | "fiat">("crypto");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const ids = COINS.map((c) => c.id).join(",");
      const fiats = FIATS.map((f) => f.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${fiats}&include_24hr_change=true`
      );
      const data = await res.json();
      setPrices(data);
      setLastUpdated(new Date());
      setError("");
    } catch {
      setError("Failed to fetch prices. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPrices(); }, [fetchPrices]);

  useEffect(() => {
    const interval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const price = prices[selectedCoin]?.[selectedFiat] || 0;
  const change24h = prices[selectedCoin]?.[`${selectedFiat}_24h_change`] || 0;
  const fiatSymbol = FIATS.find((f) => f.id === selectedFiat)?.symbol || "$";
  const coin = COINS.find((c) => c.id === selectedCoin);

  useEffect(() => {
    if (activeField === "crypto" && price) {
      const num = parseFloat(cryptoAmount);
      setFiatAmount(isNaN(num) ? "" : (num * price).toFixed(2));
    }
  }, [cryptoAmount, price, activeField]);

  useEffect(() => {
    if (activeField === "fiat" && price) {
      const num = parseFloat(fiatAmount);
      setCryptoAmount(isNaN(num) ? "" : (num / price).toPrecision(8));
    }
  }, [fiatAmount, price, activeField]);

  const formatPrice = (p: number) => {
    if (p >= 1000) return p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (p >= 1) return p.toFixed(2);
    if (p >= 0.01) return p.toFixed(4);
    return p.toFixed(8);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Crypto Price Calculator</h1>
      <p className="text-zinc-400 mb-8">
        Live cryptocurrency prices with instant conversion to any fiat currency.
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Cryptocurrency</label>
            <div className="grid grid-cols-2 gap-1.5">
              {COINS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCoin(c.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    selectedCoin === c.id ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  <span className="mr-1">{c.icon}</span> {c.symbol}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Fiat Currency</label>
            <div className="grid grid-cols-2 gap-1.5">
              {FIATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFiat(f.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedFiat === f.id ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {f.symbol} {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-zinc-500">Loading prices...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">{error}</div>
        ) : (
          <>
            <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-zinc-400 mb-1">Current Price</p>
              <p className="text-3xl font-bold text-white">
                {coin?.icon} {fiatSymbol}{formatPrice(price)}
              </p>
              {change24h !== 0 && (
                <p className={`text-sm mt-1 ${change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {change24h >= 0 ? "▲" : "▼"} {Math.abs(change24h).toFixed(2)}% (24h)
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">{coin?.name} Amount</label>
                <input
                  type="number"
                  value={cryptoAmount}
                  onChange={(e) => { setCryptoAmount(e.target.value); setActiveField("crypto"); }}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-lg placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">{fiatSymbol} {selectedFiat.toUpperCase()} Amount</label>
                <input
                  type="number"
                  value={fiatAmount}
                  onChange={(e) => { setFiatAmount(e.target.value); setActiveField("fiat"); }}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-lg placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {lastUpdated && (
        <p className="text-center text-xs text-zinc-600 mb-6">
          Prices from CoinGecko. Last updated: {lastUpdated.toLocaleTimeString()}. Auto-refreshes every 5 minutes.
        </p>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Quick Reference</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          {COINS.slice(0, 6).map((c) => {
            const p = prices[c.id]?.[selectedFiat] || 0;
            return (
              <div key={c.id} className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
                <p className="text-zinc-400 text-xs">{c.name}</p>
                <p className="text-white font-mono">{p ? fiatSymbol + formatPrice(p) : "—"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
