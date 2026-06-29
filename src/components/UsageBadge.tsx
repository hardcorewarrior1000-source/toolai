"use client";

import { useSubscription } from "@/components/SubscriptionProvider";
import Link from "next/link";

export default function UsageBadge({ toolId }: { toolId: string }) {
  const { tier, remaining } = useSubscription();
  const rem = remaining(toolId);

  if (rem === "unlimited") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        Unlimited
      </span>
    );
  }

  if (rem <= 0) {
    return (
      <Link
        href="/pricing"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full hover:bg-red-500/20 transition-colors"
      >
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
        {rem} / day — Upgrade
      </Link>
    );
  }

  const warn = rem <= 2;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
        warn ? "bg-yellow-500/10 text-yellow-400" : "bg-zinc-800 text-zinc-400"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${warn ? "bg-yellow-400" : "bg-zinc-500"}`} />
      {rem} / day remaining
    </span>
  );
}
