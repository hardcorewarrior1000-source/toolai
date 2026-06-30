import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toolai.zelve.xyz";
  const buildDate = new Date("2026-06-30");

  return [
    { url: `${base}/`, lastModified: buildDate, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blog/`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/privacy/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/pricing/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/verify/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },

    // AI & Creative Tools
    { url: `${base}/tools/ai-chatbot/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/ai-humanizer/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/color-palette/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/gradient-generator/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/image-to-base64/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/image-to-prompt/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/qr-generator/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },

    // Developer Tools
    { url: `${base}/tools/password-generator/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/json-formatter/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/word-counter/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/text-to-slug/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },

    // Crypto Tools
    { url: `${base}/tools/crypto-price-calculator/`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools/eth-gas-estimator/`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools/wallet-balance-checker/`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tools/crypto-address-validator/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/crypto-unit-converter/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/mnemonic-generator/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/crypto-payment-link/`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },

    // Blog posts
    { url: `${base}/blog/how-to-humanize-ai-text/`, lastModified: new Date("2026-06-29"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/best-free-ai-tools-2026/`, lastModified: new Date("2026-06-28"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/what-is-image-to-prompt/`, lastModified: new Date("2026-06-27"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-generate-secure-passwords-online/`, lastModified: new Date("2026-06-24"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/format-json-online-free/`, lastModified: new Date("2026-06-23"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/what-is-a-qr-code/`, lastModified: new Date("2026-06-25"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/best-free-online-tools-developers-2026/`, lastModified: new Date("2026-06-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/convert-image-to-base64-string/`, lastModified: new Date("2026-06-15"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-validate-bitcoin-address/`, lastModified: new Date("2026-06-22"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/eth-to-wei-converter-guide/`, lastModified: new Date("2026-06-21"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/best-free-crypto-price-calculator-2026/`, lastModified: new Date("2026-06-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/understanding-ethereum-gas-fees/`, lastModified: new Date("2026-06-19"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-check-wallet-balance/`, lastModified: new Date("2026-06-18"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/what-is-bip39-mnemonic-phrase/`, lastModified: new Date("2026-06-17"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-create-crypto-payment-link/`, lastModified: new Date("2026-06-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/free-ai-chatbot-playground-no-signup/`, lastModified: new Date("2026-06-15"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/best-free-ai-chatbot-2026/`, lastModified: new Date("2026-06-14"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-humanize-chatgpt-text/`, lastModified: new Date("2026-06-12"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/best-free-crypto-tools-2026/`, lastModified: new Date("2026-06-10"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-check-crypto-wallet-balance/`, lastModified: new Date("2026-06-08"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/free-online-developer-tools-2026/`, lastModified: new Date("2026-06-05"), changeFrequency: "monthly", priority: 0.7 },
  ];
}
