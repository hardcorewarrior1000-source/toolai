import type { Metadata } from "next";
import PasswordGeneratorTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Password Generator — Secure Random Passwords | Zelve Tool AI",
  description: "Generate secure, random passwords with customizable length and character types. Cryptographically secure using Web Crypto API. Free, fast, and private.",
  keywords: ["password generator", "random password", "secure password", "online password generator", "strong password creator", "Zelve password generator"],
  openGraph: {
    title: "Free Password Generator — Secure Random Passwords",
    description: "Generate secure, random passwords with customizable length and character types.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Password Generator — Secure Random Passwords",
    description: "Generate secure, random passwords with customizable length and character types.",
  },
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Password Generator",
            url: "https://toolai.zelve.xyz/tools/password-generator",
            description: "Generate secure, random passwords with customizable length and character types.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <PasswordGeneratorTool />
      <SEOContent toolId="password-generator" />
    </>
  );
}
