import type { Metadata } from "next";
import UnitConverterTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Crypto Unit Converter — BTC, ETH & SOL | Zelve Tool AI",
  description: "Convert between Bitcoin, Ethereum, and Solana units instantly. BTC to sats, ETH to Gwei, SOL to lamports. Bidirectional real-time converter.",
  keywords: ["crypto converter", "bitcoin unit converter", "ETH to wei", "satoshi converter", "gwei calculator", "solana lamports", "Zelve crypto converter"],
  openGraph: {
    title: "Free Crypto Unit Converter — BTC, ETH & SOL",
    description: "Convert between Bitcoin, Ethereum, and Solana units instantly.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Crypto Unit Converter — BTC, ETH & SOL",
    description: "Convert between Bitcoin, Ethereum, and Solana units instantly.",
  },
};

export default function CryptoUnitConverterPage() {
  return (
    <>
      <UnitConverterTool />
      <SEOContent
        title="About the Crypto Unit Converter"
        description="The Crypto Unit Converter makes it easy to convert between different denominations of Bitcoin, Ethereum, and Solana. Convert BTC to satoshis, ETH to Gwei and Wei, SOL to lamports, and more. The converter is bidirectional — enter a value in any field and see the equivalent in all other units."
        features={[
          "Convert between all Bitcoin units: BTC, mBTC, bits, and satoshis",
          "Convert between all Ethereum units: ETH, Gwei, and Wei",
          "Convert between all Solana units: SOL and lamports",
          "Bidirectional — enter any value, see all conversions instantly",
          "Real-time results as you type",
          "All math done client-side for speed and privacy",
        ]}
        howToUse={[
          "Select the cryptocurrency (Bitcoin, Ethereum, or Solana).",
          "Enter a value in any unit field.",
          "See the equivalent values in all other units instantly.",
          "The conversion is bidirectional — try entering a value in any field.",
        ]}
        faq={[
          { question: "What is a satoshi?", answer: "A satoshi is the smallest unit of Bitcoin, equal to 0.00000001 BTC (one hundred millionth of a Bitcoin). There are 100,000,000 satoshis in 1 BTC." },
          { question: "What is Gwei?", answer: "Gwei is a denomination of Ethereum equal to 0.000000001 ETH (one billionth of an ETH). It's commonly used to measure gas fees on the Ethereum network." },
          { question: "What are lamports on Solana?", answer: "Lamports are the smallest unit of SOL, equal to 0.000000001 SOL (one billionth of a SOL). They are named after computer scientist Leslie Lamport." },
        ]}
      />
    </>
  );
}
