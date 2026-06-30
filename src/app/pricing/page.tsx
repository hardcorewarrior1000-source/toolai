"use client";

import { useState, useEffect } from "react";
import { tiers } from "@/lib/subscription";
import { useSubscription } from "@/components/SubscriptionProvider";
import { WALLETS, type Chain, fetchLivePrices, getAmountForTier } from "@/lib/crypto-verify";
import { getLicense, clearLicense, type LicenseData } from "@/lib/license";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export default function PricingPage() {
  const { tier: currentTier, setTier, refresh } = useSubscription();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [chain, setChain] = useState<Chain>("solana");
  const [copied, setCopied] = useState("");
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [solPrice, setSolPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);

  const license: LicenseData | null = typeof window !== "undefined" ? getLicense() : null;

  useEffect(() => {
    fetchLivePrices().then((p) => {
      setSolPrice(p.solana);
      setEthPrice(p.ethereum);
      setBtcPrice(p.bitcoin);
    });
  }, []);

  useEffect(() => {
    if (!selectedTier || !chain) return;
    const load = async () => {
      const tiers_list = ["starter", "pro", "business", "enterprise"];
      const map: Record<string, string> = {};
      for (const t of tiers_list) {
        map[t] = await getAmountForTier(t, chain);
      }
      setAmounts(map);
    };
    load();
  }, [selectedTier, chain]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleClear = () => {
    clearLicense();
    setTier("free");
    refresh();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">
          Simple, Transparent <span className="text-emerald-400">Pricing</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Start free, upgrade with crypto. No bank account needed. Pay with SOL, ETH, or BTC.
        </p>
      </section>

      {license && (
        <div className="bg-emerald-950/50 border border-emerald-800 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-emerald-300">Active Subscription</h2>
            <button
              onClick={handleClear}
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-4 text-sm text-zinc-400 flex-wrap">
            <span>Plan: <span className="text-zinc-200 font-medium">{tiers.find(t => t.id === license.tier)?.name}</span></span>
            <span>Key: <span className="font-mono text-emerald-400">{license.key}</span></span>
            <span>Expires: <span className="text-zinc-200">{new Date(license.expiresAt).toLocaleDateString()}</span></span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {tiers.map((t) => {
          const isActive = currentTier.id === t.id;
          const isFree = t.price === 0;
          const isPopular = t.id === "pro";
          const isSelected = selectedTier === t.id;

          return (
            <div
              key={t.id}
              className={`relative bg-zinc-900 border rounded-xl p-6 flex flex-col transition-colors ${
                isActive
                  ? "border-emerald-500 shadow-lg shadow-emerald-500/10"
                  : isPopular
                  ? "border-emerald-500/50"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-white">{t.priceLabel}</span>
                  {!isFree && <span className="text-zinc-500 text-sm"> / month</span>}
                </div>
              </div>

              <p className="text-zinc-400 text-sm mb-4 flex-1">{t.description}</p>

              <ul className="space-y-2 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="text-sm text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {isActive ? (
                <button
                  disabled
                  className="w-full py-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold cursor-default"
                >
                  Current Plan
                </button>
              ) : isFree ? (
                <button
                  onClick={() => setTier(t.id)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                >
                  Get Started
                </button>
              ) : (
                <button
                  onClick={() => setSelectedTier(isSelected ? null : t.id)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isPopular
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  }`}
                >
                  {isSelected ? "Hide" : `Pay with Crypto`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {selectedTier && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-white mb-2">
            Pay for {tiers.find(t => t.id === selectedTier)?.name} plan
          </h2>
          <p className="text-zinc-500 text-xs mb-4">
            Live prices via CoinGecko. Amounts update every 5 minutes.
          </p>

          <div className="flex gap-2 mb-4">
            {(["solana", "ethereum", "bitcoin"] as Chain[]).map((c) => (
              <button
                key={c}
                onClick={() => setChain(c)}
                className={`flex-1 p-3 rounded-lg border text-center transition-colors ${
                  chain === c
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                <span className="text-xl block">{WALLETS[c].icon}</span>
                <span className="text-xs font-medium">{WALLETS[c].label}</span>
                <span className="text-[10px] text-zinc-500 block">
                  ${c === "solana" ? solPrice.toFixed(2) : c === "ethereum" ? ethPrice.toFixed(0) : btcPrice.toLocaleString()}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 mb-4">
            <p className="text-xs text-zinc-500 mb-1">Send exactly:</p>
            <p className="font-mono text-lg text-emerald-400 font-bold">
              {amounts[selectedTier] || "Loading..."} {WALLETS[chain].label}
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 mb-4">
            <p className="text-xs text-zinc-500 mb-2">To this address:</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-emerald-400 break-all flex-1 leading-relaxed">
                {WALLETS[chain].address}
              </p>
              <button
                onClick={() => handleCopy(WALLETS[chain].address, "address")}
                className="shrink-0 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs transition-colors"
              >
                {copied === "address" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 mb-4">
            <p className="text-xs text-zinc-500 mb-2">All tiers ({WALLETS[chain].label}):</p>
            <div className="grid grid-cols-2 gap-2">
              {["starter", "pro", "business", "enterprise"].map((tierId) => (
                <div key={tierId} className={`flex justify-between text-xs p-2 rounded ${tierId === selectedTier ? "bg-emerald-500/10 text-emerald-400" : "text-zinc-400"}`}>
                  <span className="capitalize">{tierId}</span>
                  <span className="font-mono">
                    {amounts[tierId] || "..."} {WALLETS[chain].label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/verify"
            className="block w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-center transition-colors"
          >
            I&apos;ve sent payment — Verify Now
          </Link>
        </div>
      )}

      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 px-4 text-zinc-400 font-medium">Feature</th>
                {tiers.map((t) => (
                  <th key={t.id} className={`text-center py-3 px-4 font-medium ${currentTier.id === t.id ? "text-emerald-400" : "text-zinc-400"}`}>
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300 font-medium">AI Chat Models</td>
                <td className="text-center py-3 px-4 text-zinc-400 text-xs">Llama 3.3 70B, Llama 3.1 8B, Gemma 2 9B</td>
                <td className="text-center py-3 px-4 text-zinc-400 text-xs">Same 3 Groq models</td>
                <td className="text-center py-3 px-4 text-emerald-400 text-xs">All 6 models (Groq + OpenRouter)</td>
                <td className="text-center py-3 px-4 text-emerald-400 text-xs">All 7 models</td>
                <td className="text-center py-3 px-4 text-emerald-400 text-xs">All 7 + priority</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300 font-medium">AI Chat Messages</td>
                <td className="text-center py-3 px-4 text-zinc-500">50/day</td>
                <td className="text-center py-3 px-4 text-zinc-500">500/day</td>
                <td className="text-center py-3 px-4 text-zinc-400">5,000/day</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">AI Tools (Humanizer, QR, Image to Prompt, etc.)</td>
                <td className="text-center py-3 px-4 text-zinc-500">500/day</td>
                <td className="text-center py-3 px-4 text-zinc-500">2,500/day</td>
                <td className="text-center py-3 px-4 text-zinc-400">5,000/day</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">Basic Tools (Password, JSON, Word Counter, etc.)</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">Ads</td>
                <td className="text-center py-3 px-4 text-zinc-500">Yes</td>
                <td className="text-center py-3 px-4 text-emerald-400">None</td>
                <td className="text-center py-3 px-4 text-emerald-400">None</td>
                <td className="text-center py-3 px-4 text-emerald-400">None</td>
                <td className="text-center py-3 px-4 text-emerald-400">None</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">API Access</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-emerald-400">✓</td>
                <td className="text-center py-3 px-4 text-emerald-400">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-zinc-300">Custom Branding</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-emerald-400">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <AdBanner />
    </div>
  );
}
