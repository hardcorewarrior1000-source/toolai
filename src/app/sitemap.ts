import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toolai.zelve.xyz";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/verify`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // AI & Creative Tools
    { url: `${base}/tools/ai-chatbot`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/tools/ai-humanizer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/color-palette`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/gradient-generator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/image-to-base64`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/image-to-prompt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/qr-generator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Developer Tools
    { url: `${base}/tools/password-generator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/json-formatter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/word-counter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/text-to-slug`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Crypto Tools
    { url: `${base}/tools/crypto-price-calculator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools/eth-gas-estimator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools/wallet-balance-checker`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tools/crypto-address-validator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tools/crypto-unit-converter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/mnemonic-generator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/crypto-payment-link`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Blog posts
    { url: `${base}/blog/how-to-humanize-ai-text`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/best-free-ai-tools-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/what-is-image-to-prompt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/how-to-generate-secure-passwords-online`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/format-json-online-free`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/what-is-a-qr-code`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/best-free-online-tools-developers-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/convert-image-to-base64-string`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/how-to-validate-bitcoin-address`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/eth-to-wei-converter-guide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/best-free-crypto-price-calculator-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/understanding-ethereum-gas-fees`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/how-to-check-wallet-balance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/what-is-bip39-mnemonic-phrase`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/how-to-create-crypto-payment-link`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/free-ai-chatbot-playground-no-signup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
