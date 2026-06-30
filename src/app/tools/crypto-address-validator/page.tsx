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
      <SEOContent
        title="About the Crypto Address Validator"
        description="The Crypto Address Validator checks whether a cryptocurrency wallet address is correctly formatted and passes checksum verification. It supports Bitcoin (P2PKH, P2SH, Bech32, Bech32m), Ethereum (EIP-55 mixed-case checksum), and Solana (Base58). Before sending crypto, always validate the recipient address to avoid losing funds."
        features={[
          "Validates Bitcoin addresses: P2PKH, P2SH, Bech32 (SegWit), and Bech32m (Taproot)",
          "Ethereum address validation with EIP-55 mixed-case checksum",
          "Solana address validation (Base58, 32-44 characters)",
          "Instant real-time validation as you paste",
          "Clear error messages explaining what's wrong",
          "All validation happens client-side — addresses are never sent anywhere",
        ]}
        howToUse={[
          "Paste a crypto wallet address into the input field.",
          "The tool automatically detects the address type (Bitcoin, Ethereum, or Solana).",
          "See instant validation results — checkmark for valid, error message for invalid.",
          "If invalid, the tool explains what's wrong (wrong length, bad checksum, etc.).",
        ]}
        faq={[
          { question: "What happens if I send crypto to a wrong address?", answer: "Crypto transactions are irreversible. If you send to an invalid or wrong address, the funds are permanently lost. Always validate addresses before sending." },
          { question: "Can this tool check if an address has funds?", answer: "No, this tool only validates the address format and checksum. To check balances, use the Wallet Balance Checker tool." },
          { question: "Which Bitcoin address types are supported?", answer: "The tool supports all four Bitcoin address types: P2PKH (legacy, starts with 1), P2SH (nested SegWit, starts with 3), Bech32 (native SegWit, starts with bc1q), and Bech32m (Taproot, starts with bc1p)." },
        ]}
      />
    </>
  );
}
