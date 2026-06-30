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
      <SEOContent
        title="About the Image to Base64 Converter"
        description="Convert any image to a Base64 encoded string with this free online tool. Upload an image and instantly get the Base64 data URL that can be embedded directly in HTML, CSS, or JavaScript. Useful for inline images, data URIs, and situations where hosting an image file isn't practical."
        features={[
          "Instant conversion to Base64 data URL",
          "Shows file size, name, and Base64 string length",
          "Copy button for quick clipboard access",
          "Download as a .txt file for offline use",
          "Supports all common image formats",
          "Client-side processing for full privacy",
        ]}
        howToUse={[
          "Upload an image by clicking or dragging it into the upload area.",
          "View the preview, file size, and Base64 string length.",
          "Click Copy to get the full data URL on your clipboard.",
          "Alternatively, click Download to save the Base64 string as a .txt file.",
        ]}
        faq={[
          { question: "What is Base64?", answer: "Base64 is an encoding scheme that converts binary data (like images) into a text string. A Base64 data URL starts with 'data:image/...' and can be used directly in HTML img tags or CSS background-image properties." },
          { question: "When should I use Base64 instead of an image file?", answer: "Base64 is useful for small icons, reducing HTTP requests, embedding images in CSS/JS files, or when you can't host image files separately. For large images, regular files are more efficient." },
          { question: "Does encoding increase file size?", answer: "Yes, Base64 encoding increases the data size by approximately 33%. For large images, it's better to use regular image files. Base64 works best for small images and icons." },
        ]}
      />
    </>
  );
}
