import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Zelve Tool AI — Free Online Tools for Everyone",
  description: "Learn about Zelve Tool AI — a free, privacy-first platform with 18+ browser-based tools for developers, creators, and crypto enthusiasts. No signup, no data collection.",
  openGraph: {
    title: "About Zelve Tool AI",
    description: "Free, privacy-first online tools for developers, creators, and crypto enthusiasts.",
    url: "https://toolai.zelve.xyz/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
