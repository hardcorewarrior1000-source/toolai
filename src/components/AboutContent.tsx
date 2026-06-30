"use client";

import AdBanner from "@/components/AdBanner";
import { useLocale } from "@/i18n/provider";
import { WALLETS } from "@/lib/wallets";

export default function AboutContent() {
  const { t } = useLocale();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">{t.about.title}</h1>

      <div className="space-y-6 text-zinc-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t.about.missionTitle}</h2>
          <p>{t.about.missionDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t.about.whatWeOfferTitle}</h2>
          <p>{t.about.whatWeOfferDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t.about.privacyTitle}</h2>
          <p>{t.about.privacyDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t.about.supportTitle}</h2>
          <p>{t.about.supportDesc}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">{t.about.builtWithTitle}</h2>
          <p>{t.about.builtWithDesc}</p>
        </section>
      </div>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">{t.about.supportUsTitle}</h2>
        <p className="text-zinc-500 text-sm mb-4">{t.about.supportUsDesc}</p>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-zinc-500">Solana:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              {WALLETS.solana.address}
            </div>
          </div>
          <div>
            <span className="text-zinc-500">Ethereum / BSC / Polygon:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              {WALLETS.ethereum.address}
            </div>
          </div>
          <div>
            <span className="text-zinc-500">Bitcoin:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              {WALLETS.bitcoin.address}
            </div>
          </div>
        </div>
      </div>

      <AdBanner />
    </div>
  );
}
