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
      <SEOContent toolId="crypto-payment-link" />
    </>
  );
}
