import type { Metadata } from "next";
import CryptoPriceTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Crypto Price Calculator — Live BTC, ETH & SOL Prices | Zelve Tool AI",
  description: "Check live cryptocurrency prices for 10 coins in 7 fiat currencies. Real-time conversion with 24h change. Powered by CoinGecko. Free tool.",
  keywords: ["crypto price calculator", "bitcoin price", "ethereum price", "SOL price", "crypto to USD", "live crypto prices", "Zelve crypto calculator"],
  openGraph: {
    title: "Free Crypto Price Calculator — Live BTC, ETH & SOL Prices",
    description: "Check live cryptocurrency prices for 10 coins in 7 fiat currencies.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Crypto Price Calculator — Live BTC, ETH & SOL Prices",
    description: "Check live cryptocurrency prices for 10 coins in 7 fiat currencies.",
  },
};

export default function CryptoPriceCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Crypto Price Calculator",
            url: "https://toolai.zelve.xyz/tools/crypto-price-calculator",
            description: "Check live cryptocurrency prices for 10 coins in 7 fiat currencies with real-time conversion.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <CryptoPriceTool />
      <SEOContent toolId="crypto-price-calculator" />
    </>
  );
}
