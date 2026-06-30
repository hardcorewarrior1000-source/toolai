import type { Metadata } from "next";
import WordCounterTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Word Counter — Count Words, Characters & Reading Time | Zelve Tool AI",
  description: "Count words, characters, sentences, paragraphs, and estimate reading time instantly. Free online word counter with real-time stats. No signup required.",
  keywords: ["word counter", "word count tool", "character counter", "reading time calculator", "free word counter online", "text counter", "Zelve word counter"],
  openGraph: {
    title: "Free Word Counter — Count Words, Characters & Reading Time",
    description: "Count words, characters, sentences, paragraphs, and estimate reading time instantly.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Word Counter — Count Words, Characters & Reading Time",
    description: "Count words, characters, sentences, paragraphs, and estimate reading time instantly.",
  },
};

export default function WordCounterPage() {
  return (
    <>
      <WordCounterTool />
      <SEOContent toolId="word-counter" />
    </>
  );
}
