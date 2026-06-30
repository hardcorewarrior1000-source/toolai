import type { Metadata } from "next";
import TextToSlugTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Text to URL Slug Generator | Zelve Tool AI",
  description: "Convert any text into a clean URL slug instantly. Choose separator style and toggle lowercase. Perfect for SEO-friendly URLs. Free and fast.",
  keywords: ["slug generator", "URL slug", "text to slug", "SEO slug", "URL generator", "clean URL", "Zelve slug generator"],
  openGraph: {
    title: "Free Text to URL Slug Generator",
    description: "Convert any text into a clean URL slug instantly. Choose separator style and toggle lowercase.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Text to URL Slug Generator",
    description: "Convert any text into a clean URL slug instantly. Choose separator style and toggle lowercase.",
  },
};

export default function TextToSlugPage() {
  return (
    <>
      <TextToSlugTool />
      <SEOContent
        title="About the URL Slug Generator"
        description="The URL Slug Generator converts any text into a clean, SEO-friendly URL slug. It strips special characters, collapses whitespace, and applies your preferred separator style. Use it to create clean URLs for blog posts, product pages, or any web content."
        features={[
          "Real-time slug generation as you type",
          "3 separator styles: hyphen, underscore, or no separator",
          "Lowercase toggle for consistent URL formatting",
          "Strips special characters and extra whitespace",
          "One-click copy to clipboard",
          "Instant preview of the generated slug",
        ]}
        howToUse={[
          "Type or paste your text into the input field.",
          "Choose a separator style (hyphen is standard for SEO).",
          "Toggle lowercase on or off as needed.",
          "Copy the generated slug with one click.",
        ]}
        faq={[
          { question: "What is a URL slug?", answer: "A URL slug is the part of a URL that identifies a specific page. For example, in 'example.com/my-blog-post', 'my-blog-post' is the slug. Clean slugs improve SEO and readability." },
          { question: "Which separator should I use?", answer: "Hyphens (-) are the most widely used and SEO-friendly option. Search engines treat hyphens as word separators. Underscores are acceptable but less recommended." },
          { question: "Why should slugs be lowercase?", answer: "URLs are case-sensitive by standard. Using lowercase prevents duplicate content issues where 'My-Post' and 'my-post' could be treated as different pages." },
        ]}
      />
    </>
  );
}
