"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSubscription } from "@/components/SubscriptionProvider";
import { useLocale } from "@/i18n/provider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { tier } = useSubscription();
  const { t } = useLocale();
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me").then((r) => { if (r.ok) setLoggedIn(true); else setLoggedIn(false); }).catch(() => setLoggedIn(false));
  }, [pathname]);

  return (
    <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Zelve <span className="text-emerald-400">Tool AI</span>
          {tier.id !== "free" && (
            <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">{tier.name}</span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap">{t.common.home}</Link>
          <Link href="/tools/ai-chatbot" className="hover:text-white transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap">AI Chat</Link>
          <Link href="/tools/ai-humanizer" className="hover:text-white transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap">AI Humanizer</Link>
          <Link href="/tools/crypto-price-calculator" className="hover:text-white transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap">Crypto</Link>
          <Link href="/blog" className="hover:text-white transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap">{t.common.blog}</Link>
          <Link href="/pricing" className="hover:text-white transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap">{t.common.pricing}</Link>
          <div className="w-px h-4 bg-zinc-800 mx-1" />
          <LanguageSwitcher />
          <div className="w-px h-4 bg-zinc-800 mx-1" />
          {loggedIn ? (
            <Link href="/account" className="text-emerald-400 hover:text-emerald-300 transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium">{t.common.account}</Link>
          ) : (
            <Link href="/login" className="hover:text-white transition-colors px-2.5 py-1.5 rounded-lg whitespace-nowrap">{t.common.logIn}</Link>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button className="text-zinc-400 hover:text-white p-1.5" onClick={() => setOpen(!open)}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1 text-sm text-zinc-400 max-h-[80vh] overflow-y-auto">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">{t.common.home}</Link>

          <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-medium px-3 pt-3 pb-1">AI &amp; Creative</p>
          <Link href="/tools/ai-chatbot" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">AI Chat</Link>
          <Link href="/tools/ai-humanizer" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">AI Humanizer</Link>
          <Link href="/tools/color-palette" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Color Palette</Link>
          <Link href="/tools/gradient-generator" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Gradient Generator</Link>
          <Link href="/tools/image-to-base64" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Image to Base64</Link>
          <Link href="/tools/image-to-prompt" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Image to Prompt</Link>
          <Link href="/tools/qr-generator" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">QR Generator</Link>

          <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-medium px-3 pt-3 pb-1">Developer</p>
          <Link href="/tools/password-generator" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Password Generator</Link>
          <Link href="/tools/json-formatter" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">JSON Formatter</Link>
          <Link href="/tools/word-counter" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Word Counter</Link>
          <Link href="/tools/text-to-slug" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Text to Slug</Link>

          <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-medium px-3 pt-3 pb-1">Crypto</p>
          <Link href="/tools/crypto-price-calculator" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Price Calculator</Link>
          <Link href="/tools/eth-gas-estimator" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Gas Fee Estimator</Link>
          <Link href="/tools/wallet-balance-checker" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Balance Checker</Link>
          <Link href="/tools/crypto-address-validator" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Address Validator</Link>
          <Link href="/tools/crypto-unit-converter" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Unit Converter</Link>
          <Link href="/tools/mnemonic-generator" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Mnemonic Generator</Link>
          <Link href="/tools/crypto-payment-link" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg hover:bg-zinc-900/50">Payment Link Generator</Link>

          <div className="section-divider my-2" />
          <Link href="/pricing" onClick={() => setOpen(false)} className="hover:text-emerald-400 px-3 py-2 rounded-lg font-medium">{t.common.pricing}</Link>
          <Link href="/verify" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg">Verify Payment</Link>
          {loggedIn ? (
            <Link href="/account" onClick={() => setOpen(false)} className="text-emerald-400 hover:text-emerald-300 px-3 py-2 rounded-lg font-medium">{t.common.account}</Link>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg">{t.common.logIn}</Link>
          )}
          <Link href="/about" onClick={() => setOpen(false)} className="hover:text-white px-3 py-2 rounded-lg">{t.common.about}</Link>
        </div>
      )}
    </header>
  );
}
