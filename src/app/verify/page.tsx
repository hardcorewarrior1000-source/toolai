"use client";

import { useState } from "react";
import { verifyTransaction, type Chain, WALLETS, getAmountForTier } from "@/lib/crypto-verify";
import { activateLicense, getLicense, clearLicense, type LicenseData } from "@/lib/license";
import { useSubscription } from "@/components/SubscriptionProvider";
import AdBanner from "@/components/AdBanner";

const TIER_NAMES: Record<string, string> = {
  starter: "Starter ($5/mo)",
  pro: "Pro ($15/mo)",
  business: "Business ($45/mo)",
  enterprise: "Enterprise ($99/mo)",
};

export default function VerifyPage() {
  const { setTier, refresh } = useSubscription();
  const [chain, setChain] = useState<Chain>("solana");
  const [txHash, setTxHash] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{ success: boolean; tier?: string; error?: string } | null>(null);
  const [license, setLicense] = useState<LicenseData | null>(null);

  const existingLicense = typeof window !== "undefined" ? getLicense() : null;

  const handleVerify = async () => {
    if (!txHash.trim()) return;
    setVerifying(true);
    setResult(null);

    const res = await verifyTransaction(txHash.trim(), chain);
    setResult(res);

    if (res.success && res.tier && res.tier !== "free") {
      const lic = await activateLicense(txHash.trim(), res.tier, chain);
      setLicense(lic);
      setTier(res.tier);
      refresh();
    }
    setVerifying(false);
  };

  const handleClear = () => {
    clearLicense();
    setLicense(null);
    setTier("free");
    refresh();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">
        Verify <span className="text-emerald-400">Payment</span>
      </h1>
      <p className="text-zinc-400 mb-8">
        Paste your transaction hash after sending crypto to activate your plan.
      </p>

      {existingLicense && (
        <div className="bg-emerald-950/50 border border-emerald-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-emerald-300">Active License</h2>
            <button
              onClick={handleClear}
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
            >
              Deactivate
            </button>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-zinc-300">
              <span className="text-zinc-500">Plan:</span>{" "}
              {TIER_NAMES[existingLicense.tier] || existingLicense.tier}
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-500">Key:</span>{" "}
              <span className="font-mono text-emerald-400">{existingLicense.key}</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-500">Chain:</span>{" "}
              {WALLETS[existingLicense.chain as Chain]?.label || existingLicense.chain}
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-500">Expires:</span>{" "}
              {new Date(existingLicense.expiresAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">1. Choose a plan & send crypto</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(["solana", "ethereum", "bitcoin"] as Chain[]).map((c) => (
            <button
              key={c}
              onClick={() => setChain(c)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                chain === c
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              <span className="text-2xl block">{WALLETS[c].icon}</span>
              <span className="text-sm font-medium">{WALLETS[c].label}</span>
            </button>
          ))}
        </div>

        <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 mb-4">
          <p className="text-xs text-zinc-500 mb-2">Send to this address:</p>
          <p className="font-mono text-xs text-emerald-400 break-all leading-relaxed">
            {WALLETS[chain].address}
          </p>
        </div>

        <div className="space-y-2 text-sm mb-4">
          {["starter", "pro", "business", "enterprise"].map((tierId) => (
            <div key={tierId} className="flex justify-between items-center text-zinc-400">
              <span>{TIER_NAMES[tierId]}</span>
              <span className="font-mono text-zinc-300">
                {getAmountForTier(tierId, chain)} {WALLETS[chain].label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-600">
          License valid for 30 days from activation. Send at least the minimum amount for your chosen tier.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">2. Paste your transaction hash</h2>
        <input
          type="text"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="Enter transaction hash..."
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
        />
        <button
          onClick={handleVerify}
          disabled={verifying || !txHash.trim()}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-semibold rounded-lg transition-colors"
        >
          {verifying ? "Verifying..." : "Verify & Activate"}
        </button>
      </div>

      {result && (
        <div
          className={`rounded-xl p-6 mb-6 ${
            result.success
              ? "bg-emerald-950/50 border border-emerald-800"
              : "bg-red-950/50 border border-red-800"
          }`}
        >
          {result.success ? (
            <div>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Payment Verified!
              </h3>
              <p className="text-zinc-400 text-sm mb-2">
                Your plan has been activated. Enjoy your upgraded access!
              </p>
              {license && (
                <div className="bg-zinc-900 rounded-lg p-3 mt-3">
                  <p className="text-xs text-zinc-500 mb-1">Your license key:</p>
                  <p className="font-mono text-sm text-emerald-400">{license.key}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-red-300 mb-2">
                Verification Failed
              </h3>
              <p className="text-zinc-400 text-sm">{result.error}</p>
            </div>
          )}
        </div>
      )}

      <AdBanner />
    </div>
  );
}
