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
      <SEOContent
        title="About the Gas Fee Estimator"
        description="The Gas Fee Estimator provides real-time gas prices for Ethereum, Polygon, and BNB Chain networks. It shows Low, Average, and Fast Gwei prices along with estimated USD transaction costs for different transaction types. Auto-refreshes every 30 seconds so you always have current data."
        features={[
          "Live gas prices for Ethereum, Polygon, and BNB Chain",
          "Low, Average, and Fast speed categories",
          "USD cost estimation based on current ETH price",
          "Transaction type selector (simple transfer to contract interaction)",
          "Auto-refresh every 30 seconds",
          "Supports EIP-1559 (base fee + priority fee) breakdown",
        ]}
        howToUse={[
          "Select the network you want to check (Ethereum, Polygon, or BNB Chain).",
          "Choose the transaction type — simple transfers use less gas than smart contract calls.",
          "View the current Low, Average, and Fast gas prices in Gwei.",
          "See the estimated USD cost for your selected transaction type.",
        ]}
        faq={[
          { question: "What is gas in Ethereum?", answer: "Gas is the unit that measures computational effort on Ethereum. Every operation (sending ETH, swapping tokens, minting NFTs) costs gas. Gas price is measured in Gwei (1 Gwei = 0.000000001 ETH)." },
          { question: "When should I use Low vs Fast?", answer: "Use Low gas when timing isn't critical — the transaction may take minutes. Use Fast for time-sensitive transactions like NFT mints or DEX trades where speed matters." },
          { question: "How often do prices update?", answer: "The tool auto-refreshes every 30 seconds by querying public blockchain RPC nodes. Gas prices can change rapidly during network congestion." },
        ]}
      />
    </>
  );
}
