import type { Metadata } from "next";
import HumanizerTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free AI Humanizer — Make AI Text Sound Human | Zelve Tool AI",
  description: "Free AI text humanizer with 60+ transformations. Convert ChatGPT, Gemini, and Claude text to natural, human-like writing. Real-time diff view.",
  keywords: ["AI humanizer", "humanize AI text", "AI to human text", "ChatGPT humanizer", "make AI text sound human", "AI text converter", "Zelve AI Humanizer"],
  openGraph: {
    title: "Free AI Humanizer — Make AI Text Sound Human",
    description: "Paste AI-generated text and make it sound natural with 60+ transformations. Light, Medium, Aggressive, and Extreme modes available.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Humanizer — Make AI Text Sound Human",
    description: "Paste AI-generated text and make it sound natural with 60+ transformations. Light, Medium, Aggressive, and Extreme modes available.",
  },
};

export default function AIHumanizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI Humanizer",
            url: "https://toolai.zelve.xyz/tools/ai-humanizer",
            description: "Free AI text humanizer with 60+ transformations to make AI-generated text sound natural and human-like.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What does the AI Humanizer do?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The AI Humanizer transforms AI-generated text into natural, human-like writing using 60+ transformations including contractions, casual tone adjustments, discourse markers, and sentence restructuring.",
                },
              },
              {
                "@type": "Question",
                name: "Can this tool bypass AI detection tools?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The tool applies human-like transformations to make AI text sound more natural. While it significantly improves readability and tone, we recommend reviewing the output for accuracy and context.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between strength levels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Light applies minor tweaks and contractions. Medium adds natural tone and discourse markers. Aggressive performs major rewrites. Extreme (Pro only) restructures sentences and simplifies complex phrasing.",
                },
              },
              {
                "@type": "Question",
                name: "Which AI text does this work with?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The AI Humanizer works with text from any AI source — ChatGPT, Gemini, Claude, Copilot, and others. Simply paste the generated text and it will be transformed in real-time.",
                },
              },
            ],
          }),
        }}
      />
      <HumanizerTool />
      <SEOContent toolId="ai-humanizer" />
    </>
  );
}
