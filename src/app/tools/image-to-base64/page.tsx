import type { Metadata } from "next";
import ImageToBase64Tool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Image to Base64 Converter — Free Online Tool | Zelve Tool AI",
  description: "Convert any image to a Base64 data URL for embedding in HTML, CSS, or JavaScript. Free, fast, and 100% client-side. No uploads.",
  keywords: ["image to base64", "base64 converter", "image to data url", "base64 image encoder", "embed image HTML", "Zelve base64 converter"],
  openGraph: {
    title: "Image to Base64 Converter — Free Online Tool",
    description: "Convert any image to a Base64 data URL for embedding in HTML, CSS, or JavaScript. No uploads — runs entirely in your browser.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Base64 Converter — Free Online Tool",
    description: "Convert any image to a Base64 data URL for embedding in HTML, CSS, or JavaScript. No uploads — runs entirely in your browser.",
  },
};

export default function ImageToBase64Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Image to Base64 Converter",
            url: "https://toolai.zelve.xyz/tools/image-to-base64",
            description: "Convert any image to a Base64 data URL for embedding in HTML, CSS, or JavaScript.",
            applicationCategory: "DeveloperApplication",
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
                name: "What is Base64 encoding for images?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Base64 encoding converts binary image data into a text string that can be embedded directly in HTML, CSS, or JavaScript without needing a separate file reference.",
                },
              },
              {
                "@type": "Question",
                name: "Why would I convert an image to Base64?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Base64-encoded images are useful for embedding small images directly in HTML or CSS, reducing HTTP requests, and for use in data URIs where external file references aren't available.",
                },
              },
              {
                "@type": "Question",
                name: "Is my image uploaded to any server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The conversion happens entirely in your browser using the FileReader API. Your image never leaves your device.",
                },
              },
              {
                "@type": "Question",
                name: "What image formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All standard image formats are supported including PNG, JPG, JPEG, WebP, GIF, BMP, and SVG.",
                },
              },
            ],
          }),
        }}
      />
      <ImageToBase64Tool />
      <SEOContent toolId="image-to-base64" />
    </>
  );
}
