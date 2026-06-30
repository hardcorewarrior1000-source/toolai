"use client";

import { useState } from "react";
import { WALLETS, type Chain } from "@/lib/wallets";

const walletList = [
  { label: "Solana", chain: "solana" as Chain },
  { label: "Ethereum / BSC / Polygon", chain: "ethereum" as Chain },
  { label: "Bitcoin", chain: "bitcoin" as Chain },
];

export default function TipJar() {
  const [copiedIdx, setCopiedIdx] = useState(-1);

  const copy = (addr: string, idx: number) => {
    navigator.clipboard.writeText(addr);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(-1), 2000);
  };

  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold text-white mb-2">Support Zelve Tool AI</h3>
      <p className="text-zinc-400 text-sm mb-4">
        Like this tool? Send a tip to support free online AI tools.
      </p>
      <div className="space-y-2 text-left">
        {walletList.map((w, i) => (
          <div key={w.chain} className="bg-zinc-950 border border-zinc-700 rounded-lg p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs text-zinc-500 mb-1">{w.label}</p>
              <p className="font-mono text-xs text-emerald-400 break-all">{WALLETS[w.chain].address}</p>
            </div>
            <button
              onClick={() => copy(WALLETS[w.chain].address, i)}
              className="shrink-0 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded transition-colors"
            >
              {copiedIdx === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
