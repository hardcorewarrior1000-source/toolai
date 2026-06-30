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
      <SEOContent
        title="About the Password Generator"
        description="The Password Generator creates secure, random passwords using the Web Crypto API for true cryptographic randomness. Customize password length from 8 to 64 characters and choose which character types to include — uppercase letters, lowercase letters, numbers, and symbols. A built-in strength indicator shows you how secure the generated password is."
        features={[
          "Cryptographically secure using crypto.getRandomValues()",
          "Customizable length from 8 to 64 characters",
          "Toggle uppercase, lowercase, numbers, and symbols",
          "Built-in password strength indicator (Weak, Fair, Strong, Very Strong)",
          "One-click copy to clipboard",
          "100% local — passwords never leave your browser",
        ]}
        howToUse={[
          "Set the desired password length using the slider (8-64 characters).",
          "Toggle character types: uppercase, lowercase, numbers, and/or symbols.",
          "Click Generate Password to create a new random password.",
          "Copy the password to your clipboard and use it wherever you need a secure password.",
        ]}
        faq={[
          { question: "How long should a password be?", answer: "For most accounts, 16 characters is a good balance of security and usability. For high-security accounts (banking, email), use 24-32 characters. The maximum of 64 characters is available for maximum security." },
          { question: "Is this password generator secure?", answer: "Yes. It uses the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers, far superior to JavaScript's Math.random(). This is the same standard used by password managers and security software." },
          { question: "Are my passwords stored anywhere?", answer: "No. Passwords are generated and displayed entirely in your browser using JavaScript. Nothing is stored, logged, or sent to any server. Each generated password exists only in your browser's memory." },
        ]}
      />
    </>
  );
}
