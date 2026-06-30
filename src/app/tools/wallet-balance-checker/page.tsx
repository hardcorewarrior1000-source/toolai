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
      <SEOContent toolId="wallet-balance-checker" />
    </>
  );
}
