import type { Metadata } from "next";
import EthGasEstimatorTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Ethereum Gas Fee Estimator — Live Gas Prices | Zelve Tool AI",
  description: "Check live Ethereum, Polygon, and BNB Chain gas fees in real-time. See Low, Average, and Fast Gwei prices with estimated USD cost per transaction. Free tool.",
  keywords: ["ethereum gas fee", "gas price estimator", "ETH gas tracker", "polygon gas fee", "BSC gas fee", "gwei calculator", "Zelve gas estimator"],
  openGraph: {
    title: "Free Ethereum Gas Fee Estimator — Live Gas Prices",
    description: "Check live Ethereum, Polygon, and BNB Chain gas fees in real-time. See Low, Average, and Fast Gwei prices.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Ethereum Gas Fee Estimator — Live Gas Prices",
    description: "Check live Ethereum, Polygon, and BNB Chain gas fees in real-time.",
  },
};

export default function EthGasEstimatorPage() {
  return (
    <>
      <EthGasEstimatorTool />
      <SEOContent toolId="eth-gas-estimator" />
    </>
  );
}
