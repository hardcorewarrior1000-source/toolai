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
      <SEOContent
        title="About the Word Counter"
        description="The Word Counter is a free online tool that provides real-time statistics for any text. Whether you're writing an essay, blog post, social media caption, or article, this tool instantly counts words, characters, sentences, and paragraphs — and estimates reading and speaking time."
        features={[
          "Real-time word and character counting as you type",
          "Sentence and paragraph count",
          "Reading time and speaking time estimates",
          "Characters with and without spaces",
          "Clean, distraction-free interface",
          "Works entirely in your browser — text is never uploaded",
        ]}
        howToUse={[
          "Paste or type your text into the input area.",
          "View the stats grid below — word count, character count, sentences, and more appear instantly.",
          "Use the reading time estimate to gauge content length for your audience.",
          "Clear the text and start again as needed.",
        ]}
        faq={[
          { question: "How is reading time calculated?", answer: "Reading time is based on an average reading speed of 200-250 words per minute. Speaking time uses approximately 150 words per minute." },
          { question: "Does it count numbers as words?", answer: "Yes, the tool counts any sequence of characters separated by spaces as a word, including numbers and URLs." },
          { question: "Is my text saved or uploaded?", answer: "No. All counting happens in your browser using JavaScript. Your text is never sent to any server." },
        ]}
      />
    </>
  );
}
