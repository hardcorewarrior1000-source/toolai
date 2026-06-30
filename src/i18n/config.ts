export const locales = ["en", "th", "es", "pt", "zh", "ja", "ko", "de", "fr", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  th: "Thai",
  es: "Spanish",
  pt: "Portuguese",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  de: "German",
  fr: "French",
  ru: "Russian",
};

export const localeFlags: Record<Locale, string> = {
  en: "\uD83C\uDDEC\uD83C\uDDE7",
  th: "\uD83C\uDDF9\uD83C\uDDED",
  es: "\uD83C\uDDEA\uD83C\uDDF8",
  pt: "\uD83C\uDDE7\uD83C\uDDF7",
  zh: "\uD83C\uDDE8\uD83C\uDDF3",
  ja: "\uD83C\uDDEF\uD83C\uDDF5",
  ko: "\uD83C\uDDF0\uD83C\uDDF7",
  de: "\uD83C\uDDE9\uD83C\uDDEA",
  fr: "\uD83C\uDDEB\uD83C\uDDF7",
  ru: "\uD83C\uDDF7\uD83C\uDDFA",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
