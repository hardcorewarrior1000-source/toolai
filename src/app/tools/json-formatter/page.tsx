import type { Metadata } from "next";
import JsonFormatterTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Free Online JSON Formatter & Validator | Zelve Tool AI",
  description: "Format, validate, and minify JSON data online. Paste your JSON to get instant formatting with syntax validation. Free, fast, and private.",
  keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "JSON minifier", "format JSON online", "JSON lint", "Zelve JSON formatter"],
  openGraph: {
    title: "Free Online JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data online. Instant formatting with syntax validation.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data online. Instant formatting with syntax validation.",
  },
};

export default function JsonFormatterPage() {
  return (
    <>
      <JsonFormatterTool />
      <SEOContent toolId="json-formatter" />
    </>
  );
}
