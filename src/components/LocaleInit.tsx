"use client";

import { useState, useEffect, type ReactNode } from "react";
import { LocaleProvider } from "@/i18n/provider";
import { type Locale, defaultLocale, isValidLocale } from "@/i18n/config";

function getCookieLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(/locale=([a-z]{2})/);
  if (match && isValidLocale(match[1])) return match[1];
  return defaultLocale;
}

export default function LocaleInit({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocale(getCookieLocale());
  }, []);

  return (
    <LocaleProvider locale={locale}>
      {children}
    </LocaleProvider>
  );
}
