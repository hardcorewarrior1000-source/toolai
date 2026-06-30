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
      <SEOContent
        title="About the JSON Formatter"
        description="The JSON Formatter is a free online tool that formats, validates, and minifies JSON data. Paste your JSON string and instantly get a properly indented and formatted version. The tool also validates JSON syntax and highlights errors, making it essential for developers working with APIs and configuration files."
        features={[
          "Instant JSON formatting with proper indentation",
          "JSON validation with clear error messages",
          "Minify JSON to compact single-line format",
          "Side-by-side input and output view",
          "Copy formatted JSON to clipboard",
          "Handles large JSON files efficiently",
        ]}
        howToUse={[
          "Paste your JSON data into the input area on the left.",
          "The formatted JSON appears instantly on the right.",
          "If there are syntax errors, they are highlighted with line numbers.",
          "Click Copy to get the formatted JSON on your clipboard.",
        ]}
        faq={[
          { question: "What is JSON?", answer: "JSON (JavaScript Object Notation) is a lightweight data format used widely in APIs, configuration files, and data exchange. It uses key-value pairs and arrays in a human-readable text format." },
          { question: "Why should I format JSON?", answer: "Formatted JSON is easier to read, debug, and maintain. Minified JSON saves space for production. Both formats are valid — formatting is about readability." },
          { question: "Is there a file size limit?", answer: "The tool handles most JSON files efficiently in the browser. Extremely large files (10MB+) may cause slower formatting depending on your device's performance." },
        ]}
      />
    </>
  );
}
