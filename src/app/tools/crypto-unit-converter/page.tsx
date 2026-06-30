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
      <SEOContent toolId="crypto-unit-converter" />
    </>
  );
}
