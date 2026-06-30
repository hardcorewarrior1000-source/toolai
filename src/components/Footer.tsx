"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/provider";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/80 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Zelve <span className="text-emerald-400">Tool AI</span>
            </Link>
            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">{t.footer.aiTools}</h4>
            <div className="space-y-2 text-sm">
              <Link href="/tools/ai-chatbot" className="block text-zinc-500 hover:text-emerald-400 transition-colors">AI Chatbot</Link>
              <Link href="/tools/ai-humanizer" className="block text-zinc-500 hover:text-emerald-400 transition-colors">AI Humanizer</Link>
              <Link href="/tools/color-palette" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Color Palette</Link>
              <Link href="/tools/qr-generator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">QR Generator</Link>
              <Link href="/tools/image-to-prompt" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Image to Prompt</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">{t.footer.cryptoTools}</h4>
            <div className="space-y-2 text-sm">
              <Link href="/tools/crypto-price-calculator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Price Calculator</Link>
              <Link href="/tools/eth-gas-estimator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Gas Fee Estimator</Link>
              <Link href="/tools/wallet-balance-checker" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Balance Checker</Link>
              <Link href="/tools/crypto-address-validator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Address Validator</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">{t.footer.company}</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-zinc-500 hover:text-emerald-400 transition-colors">{t.common.about}</Link>
              <Link href="/blog" className="block text-zinc-500 hover:text-emerald-400 transition-colors">{t.common.blog}</Link>
              <Link href="/pricing" className="block text-zinc-500 hover:text-emerald-400 transition-colors">{t.common.pricing}</Link>
              <Link href="/privacy" className="block text-zinc-500 hover:text-emerald-400 transition-colors">{t.common.privacy}</Link>
            </div>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Zelve Tool AI. {t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span>{t.footer.builtWith}</span>
            <span className="text-zinc-700">|</span>
            <span>{t.footer.deployedOn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
