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
      <SEOContent
        title="About the Crypto Price Calculator"
        description="The Crypto Price Calculator provides live cryptocurrency prices for 10 popular coins (BTC, ETH, SOL, BNB, XRP, ADA, DOGE, DOT, AVAX, LINK) converted into 7 fiat currencies (USD, EUR, GBP, JPY, THB, AUD, CAD). Data is sourced from CoinGecko and auto-refreshes every 5 minutes."
        features={[
          "Live prices for 10 major cryptocurrencies",
          "Convert to 7 fiat currencies including USD, EUR, GBP, JPY, and THB",
          "Bidirectional conversion — enter crypto or fiat amounts",
          "24-hour price change percentage",
          "Auto-refreshes every 5 minutes",
          "Quick reference grid showing all coin prices at a glance",
        ]}
        howToUse={[
          "Select a cryptocurrency from the grid (BTC, ETH, SOL, etc.).",
          "Choose your preferred fiat currency (USD, EUR, GBP, etc.).",
          "Enter an amount in either the crypto or fiat field.",
          "See the converted value instantly with the current exchange rate.",
        ]}
        faq={[
          { question: "Where do the prices come from?", answer: "Prices are fetched from the CoinGecko API, which aggregates data from hundreds of cryptocurrency exchanges worldwide. Prices auto-refresh every 5 minutes." },
          { question: "How accurate are the prices?", answer: "CoinGecko aggregates prices from multiple exchanges to provide market-weighted averages. Prices may vary slightly from individual exchanges due to differences in liquidity and volume." },
          { question: "Does this tool cost anything?", answer: "No, the Crypto Price Calculator is completely free to use. There are no API keys required or hidden fees." },
        ]}
      />
    </>
  );
}
