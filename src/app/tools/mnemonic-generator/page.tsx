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
      <SEOContent
        title="About the Mnemonic Phrase Generator"
        description="The Mnemonic Phrase Generator creates secure 12 or 24-word BIP39 mnemonic phrases used as recovery seeds for cryptocurrency wallets. These word phrases are the standard backup method for wallets like MetaMask, Phantom, Ledger, and Trezor. The generator uses the Web Crypto API for true cryptographic randomness."
        features={[
          "Generate 12-word or 24-word BIP39 mnemonic phrases",
          "Uses crypto.getRandomValues() for cryptographic randomness",
          "Follows the official BIP39 English word list (2048 words)",
          "Regenerate with one click for a new phrase",
          "Copy generated phrase to clipboard",
          "All generation happens in your browser — nothing is stored or transmitted",
        ]}
        howToUse={[
          "Choose 12 words (standard) or 24 words (extra security).",
          "Click Generate to create a new random mnemonic phrase.",
          "Copy the phrase and store it securely offline — this is your wallet backup.",
          "Never share your recovery phrase with anyone or store it digitally in an insecure location.",
        ]}
        faq={[
          { question: "Should I use a 12-word or 24-word phrase?", answer: "12-word phrases are standard and secure for most users. 24-word phrases provide 256 bits of entropy vs 128 bits, offering stronger security for high-value wallets." },
          { question: "Can I use this phrase with MetaMask or Phantom?", answer: "Yes, BIP39 mnemonic phrases are the industry standard. They work with MetaMask, Phantom, Ledger, Trezor, Trust Wallet, and virtually all HD wallets." },
          { question: "Is it safe to generate phrases online?", answer: "Since this tool generates phrases entirely in your browser using cryptographic randomness, it's safe. However, always generate wallets on a secure, offline device for maximum security." },
        ]}
      />
    </>
  );
}
