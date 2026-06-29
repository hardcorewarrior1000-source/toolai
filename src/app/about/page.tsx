import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "About",
  description: "About ToolAI — free online AI-powered tools for everyone.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">About ToolAI</h1>

      <div className="space-y-4 text-zinc-400 leading-relaxed">
        <p>
          ToolAI is a collection of free, fast, browser-based tools designed to help
          developers, designers, writers, and creators work smarter.
        </p>
        <p>
          All tools run entirely in your browser — no data is sent to any server,
          no signup required, and nothing is stored.
        </p>
        <p>
          We support the project through ads and optional crypto tips. If you find
          our tools useful, consider sending a small donation.
        </p>
      </div>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Supported Wallet Addresses</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-zinc-500">Solana:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              BeS2p6srqB11aTAKCFazCTsCwhpeCZwQtfbBqegp3LsT
            </div>
          </div>
          <div>
            <span className="text-zinc-500">Ethereum / BSC / Polygon:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              0xAD99329d02c2cD485Dc86EF0E6FbaDCB0702b551
            </div>
          </div>
          <div>
            <span className="text-zinc-500">Bitcoin:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              bc1q3h9a3q4axug2csc68858mnjtpqpv0zl9f930jr
            </div>
          </div>
        </div>
      </div>

      <AdBanner />
    </div>
  );
}
