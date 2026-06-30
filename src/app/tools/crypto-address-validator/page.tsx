import type { Metadata } from "next";
import AddressValidatorTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Crypto Address Validator — Check BTC, ETH & SOL Addresses | Zelve Tool AI",
  description: "Validate Bitcoin, Ethereum, and Solana wallet addresses instantly. Check address format, checksum, and network compatibility. Free and private.",
  keywords: ["crypto address validator", "bitcoin address checker", "ethereum address validator", "solana address check", "wallet address validator", "Zelve crypto validator"],
  openGraph: {
    title: "Free Crypto Address Validator — Check BTC, ETH & SOL Addresses",
    description: "Validate Bitcoin, Ethereum, and Solana wallet addresses instantly.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Crypto Address Validator — Check BTC, ETH & SOL Addresses",
    description: "Validate Bitcoin, Ethereum, and Solana wallet addresses instantly.",
  },
};

export default function CryptoAddressValidatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Crypto Address Validator",
            url: "https://toolai.zelve.xyz/tools/crypto-address-validator",
            description: "Validate Bitcoin, Ethereum, and Solana wallet addresses instantly.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <AddressValidatorTool />
      <SEOContent toolId="crypto-address-validator" />
    </>
  );
}
