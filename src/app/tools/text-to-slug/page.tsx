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
      <SEOContent toolId="text-to-slug" />
    </>
  );
}
