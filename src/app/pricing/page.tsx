"use client";

import { tiers } from "@/lib/subscription";
import { useSubscription } from "@/components/SubscriptionProvider";
import AdBanner from "@/components/AdBanner";

export default function PricingPage() {
  const { tier: currentTier, setTier } = useSubscription();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">
          Simple, Transparent <span className="text-emerald-400">Pricing</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Start free, upgrade when you need more. No hidden fees. Cancel anytime.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {tiers.map((t) => {
          const isActive = currentTier.id === t.id;
          const isFree = t.price === 0;
          const isPopular = t.id === "pro";

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
              ) : (
                <button
                  onClick={() => setTier(t.id)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isPopular
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  }`}
                >
                  {isFree ? "Get Started" : `Upgrade to ${t.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

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
                <td className="py-3 px-4 text-zinc-300">AI Tools (Humanizer, QR, Image to Prompt, etc.)</td>
                <td className="text-center py-3 px-4 text-zinc-500">5/day</td>
                <td className="text-center py-3 px-4 text-zinc-500">30/day</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
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
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">Team Seats</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">-</td>
                <td className="text-center py-3 px-4 text-zinc-500">5 seats</td>
                <td className="text-center py-3 px-4 text-emerald-400">Unlimited</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 px-4 text-zinc-300">White-label Embeds</td>
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
