import type { Metadata } from "next";
import WalletBalanceTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Wallet Balance Checker — Check ETH, SOL & BTC Balances | Zelve Tool AI",
  description: "Check your cryptocurrency wallet balance for Ethereum, Solana, and Bitcoin. View USD value and link to block explorer. Free and private.",
  keywords: ["wallet balance checker", "ethereum balance", "solana balance", "bitcoin balance", "crypto wallet lookup", "Zelve wallet checker"],
  openGraph: {
    title: "Free Wallet Balance Checker — Check ETH, SOL & BTC Balances",
    description: "Check your cryptocurrency wallet balance for Ethereum, Solana, and Bitcoin.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Wallet Balance Checker — Check ETH, SOL & BTC Balances",
    description: "Check your cryptocurrency wallet balance for Ethereum, Solana, and Bitcoin.",
  },
};

export default function WalletBalanceCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Wallet Balance Checker",
            url: "https://toolai.zelve.xyz/tools/wallet-balance-checker",
            description: "Check Ethereum, Solana, and Bitcoin wallet balances with USD values.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <WalletBalanceTool />
      <SEOContent
        title="About the Wallet Balance Checker"
        description="The Wallet Balance Checker lets you look up the balance of any Ethereum, Solana, or Bitcoin wallet address. Paste a public address and instantly see the native token balance, estimated USD value, and a direct link to the block explorer. Great for verifying payments or checking your own holdings."
        features={[
          "Check balances for Ethereum, Solana, and Bitcoin wallets",
          "See native token balance and estimated USD value",
          "Direct link to Etherscan, Solscan, or Blockchain.com explorer",
          "Uses public RPC nodes and APIs — no API keys required",
          "Works with any valid public wallet address",
          "All lookups are read-only and completely private",
        ]}
        howToUse={[
          "Paste a wallet address into the input field.",
          "Select the blockchain network (Ethereum, Solana, or Bitcoin).",
          "Click Check Balance to fetch the current balance.",
          "View the token balance, USD value, and click the explorer link for full details.",
        ]}
        faq={[
          { question: "Can I check any wallet's balance?", answer: "Yes, you can check the balance of any public wallet address. Blockchain data is publicly transparent. However, the wallet owner's identity is not revealed." },
          { question: "How accurate is the USD value?", answer: "USD values are based on current market prices from public APIs. Prices update with each lookup but may have slight delays compared to real-time exchange prices." },
          { question: "Does this tool connect to my wallet?", answer: "No. This tool only reads public blockchain data. It never connects to or interacts with your wallet. You only need to paste a public address." },
        ]}
      />
    </>
  );
}
