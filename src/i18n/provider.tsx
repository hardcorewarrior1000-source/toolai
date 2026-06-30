"use client";

import { createContext, useContext, type ReactNode } from "react";
import { type Locale, defaultLocale } from "./config";
import { type Translations, translations } from "./translations";

interface LocaleContextType {
  locale: Locale;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  t: translations[defaultLocale],
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
