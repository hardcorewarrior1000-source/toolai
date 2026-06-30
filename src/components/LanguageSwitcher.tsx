"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/i18n/provider";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLang = (l: Locale) => {
    document.cookie = `locale=${l};path=/;max-age=31536000`;
    window.location.reload();
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-zinc-800"
        title={t.common.language}
      >
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl py-1 z-50 min-w-[160px]">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLang(l)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                locale === l
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
