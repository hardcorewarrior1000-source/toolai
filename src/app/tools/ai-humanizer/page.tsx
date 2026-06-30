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
      <SEOContent
        title="About the AI Humanizer"
        description="The AI Humanizer is a free online tool that transforms AI-generated text into natural, human-like writing. Whether you use ChatGPT, Gemini, Claude, or any other AI writing assistant, this tool helps make the output sound more authentic and personal. It applies over 60 different transformations including adding contractions, casual expressions, discourse markers, and sentence restructuring."
        features={[
          "60+ text transformations for natural-sounding output",
          "4 strength levels: Light, Medium, Aggressive, and Extreme (Pro)",
          "Real-time side-by-side diff view showing every change",
          "Editable output so you can fine-tune the result",
          "Word, character, and sentence count comparison",
          "Works with text from ChatGPT, Gemini, Claude, and any AI source",
        ]}
        howToUse={[
          "Paste your AI-generated text into the input area on the left.",
          "Choose a strength level — Light for subtle tweaks, Aggressive for major rewrites.",
          "The humanized text appears instantly on the right with a highlighted diff view.",
          "Copy the result or edit it directly in the output area.",
        ]}
        faq={[
          { question: "Will this bypass AI detection tools?", answer: "The tool applies human-like transformations to make AI text sound more natural and readable. Results vary depending on the original text and strength level chosen." },
          { question: "What is the difference between strength levels?", answer: "Light applies contractions and minor tweaks. Medium adds discourse markers and casual tone. Aggressive performs major rewrites with filler words. Extreme (Pro only) fully restructures sentences and simplifies complex phrasing." },
          { question: "Is my text stored or sent to a server?", answer: "No. All processing happens entirely in your browser. Your text is never sent to any server, making it completely private." },
        ]}
      />
    </>
  );
}
