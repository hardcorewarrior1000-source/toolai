"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  tier: string;
  license: {
    key: string;
    tier: string;
    chain: string;
    activatedAt: string;
    expiresAt: string;
  } | null;
}

const TIER_NAMES: Record<string, string> = {
  free: "Free",
  starter: "Starter ($5/mo)",
  pro: "Pro ($15/mo)",
  business: "Business ($45/mo)",
  enterprise: "Enterprise ($99/mo)",
};

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setUser)
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">
        Your <span className="text-emerald-400">Account</span>
      </h1>
      <p className="text-zinc-400 mb-8">{user.email}</p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Subscription</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            user.tier === "free" ? "bg-zinc-800 text-zinc-400" : "bg-emerald-500/20 text-emerald-400"
          }`}>
            {TIER_NAMES[user.tier] || user.tier}
          </span>
        </div>

        {user.license ? (
          <div className="space-y-3">
            <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
              <p className="text-xs text-zinc-500 mb-1">License Key</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm text-emerald-400 break-all flex-1">
                  {user.license.key}
                </p>
                <button
                  onClick={() => handleCopy(user.license!.key, "key")}
                  className="shrink-0 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs transition-colors"
                >
                  {copied === "key" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
                <p className="text-xs text-zinc-500 mb-1">Chain</p>
                <p className="text-zinc-300 uppercase">{user.license.chain}</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
                <p className="text-xs text-zinc-500 mb-1">Expires</p>
                <p className="text-zinc-300">
                  {new Date(user.license.expiresAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
              <p className="text-xs text-zinc-500 mb-1">Activated</p>
              <p className="text-zinc-300 text-sm">
                {new Date(user.license.activatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-zinc-500 mb-4">No active subscription</p>
            <Link
              href="/pricing"
              className="inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-sm transition-colors"
            >
              View Plans
            </Link>
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg text-sm transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}
