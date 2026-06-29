"use client";

import Link from "next/link";

export default function UpgradePrompt({ toolId }: { toolId: string }) {
  return (
    <div className="bg-zinc-900 border border-emerald-500/30 rounded-xl p-6 text-center">
      <div className="text-3xl mb-3">🔒</div>
      <h3 className="text-lg font-semibold text-white mb-2">Daily Limit Reached</h3>
      <p className="text-zinc-400 text-sm mb-4">
        You&apos;ve used all your free uses for this tool today. Upgrade to unlock more.
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/pricing"
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-sm transition-colors"
        >
          View Plans
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors"
        >
          Try Again Tomorrow
        </button>
      </div>
    </div>
  );
}
