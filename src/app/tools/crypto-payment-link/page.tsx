import type { Metadata } from "next";
import PaymentLinkTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Crypto Payment Link Generator — BTC, ETH & SOL | Zelve Tool AI",
  description: "Generate payment URIs for Bitcoin, Ethereum, and Solana. Create BIP21 and EIP-681 compliant payment links with custom amounts. Free tool.",
  keywords: ["crypto payment link", "bitcoin payment URI", "Ethereum payment link", "BIP21 generator", "EIP-681", "solana payment link", "Zelve payment link"],
  openGraph: {
    title: "Free Crypto Payment Link Generator — BTC, ETH & SOL",
    description: "Generate payment URIs for Bitcoin, Ethereum, and Solana.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Crypto Payment Link Generator — BTC, ETH & SOL",
    description: "Generate payment URIs for Bitcoin, Ethereum, and Solana.",
  },
};

export default function CryptoPaymentLinkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Crypto Payment Link Generator",
            url: "https://toolai.zelve.xyz/tools/crypto-payment-link",
            description: "Generate payment URIs for Bitcoin, Ethereum, and Solana with custom amounts.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <PaymentLinkTool />
      <SEOContent
        title="About the Crypto Payment Link Generator"
        description="The Crypto Payment Link Generator creates standard payment URIs for Bitcoin, Ethereum, and Solana. These links follow official protocols (BIP21 for BTC, EIP-681 for ETH, Solana URIs) and can be shared with customers or friends to request crypto payments with a specific amount pre-filled."
        features={[
          "Generate BIP21-compliant Bitcoin payment URIs",
          "Generate EIP-681-compliant Ethereum payment URIs",
          "Generate Solana payment URIs",
          "Optional amount parameter for pre-filled payment requests",
          "One-click copy for sharing",
          "Works with any compatible crypto wallet app",
        ]}
        howToUse={[
          "Select the cryptocurrency (Bitcoin, Ethereum, or Solana).",
          "Enter the recipient wallet address.",
          "Optionally enter an amount in the chosen cryptocurrency.",
          "Copy the generated payment URI and share it with the payer.",
        ]}
        faq={[
          { question: "What is a payment URI?", answer: "A payment URI is a standardized link format that crypto wallets understand. When clicked, it opens the user's wallet app with the address and amount pre-filled, making payments quick and error-free." },
          { question: "Which wallets support payment URIs?", answer: "Most major wallets support them: MetaMask (ETH), Phantom (SOL), Trust Wallet, Ledger Live, and many more. Bitcoin wallets like BlueWallet and Sparrow support BIP21 URIs." },
          { question: "What is the difference between BIP21 and EIP-681?", answer: "BIP21 is the Bitcoin standard for payment URIs (bitcoin:address?amount=X). EIP-681 is the Ethereum equivalent (ethereum:address?value=X&chainId=1). Both serve the same purpose for their respective chains." },
        ]}
      />
    </>
  );
}
