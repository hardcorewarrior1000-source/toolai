import type { Metadata } from "next";
import MnemonicGeneratorTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free BIP39 Mnemonic Phrase Generator — Secure Seed Phrase | Zelve Tool AI",
  description: "Generate secure 12 or 24-word BIP39 mnemonic phrases for crypto wallet recovery seeds. Cryptographically secure, runs entirely in your browser.",
  keywords: ["mnemonic generator", "BIP39 generator", "seed phrase generator", "crypto wallet recovery phrase", "12 word phrase", "24 word phrase", "Zelve mnemonic"],
  openGraph: {
    title: "Free BIP39 Mnemonic Phrase Generator — Secure Seed Phrase",
    description: "Generate secure 12 or 24-word BIP39 mnemonic phrases for crypto wallet recovery seeds.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BIP39 Mnemonic Phrase Generator — Secure Seed Phrase",
    description: "Generate secure 12 or 24-word BIP39 mnemonic phrases for crypto wallet recovery seeds.",
  },
};

export default function MnemonicGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Mnemonic Generator",
            url: "https://toolai.zelve.xyz/tools/mnemonic-generator",
            description: "Generate secure 12 or 24-word BIP39 mnemonic phrases for crypto wallets.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <MnemonicGeneratorTool />
      <SEOContent toolId="mnemonic-generator" />
    </>
  );
}
