import type { Metadata } from "next";
import ColorPaletteTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "Color Palette Generator from Image — Free Online Tool | Zelve Tool AI",
  description: "Extract dominant colors from any image instantly. Free online color palette generator that analyzes photos and returns hex codes. 100% client-side processing.",
  keywords: ["color palette generator", "extract colors from image", "image color picker", "hex color codes", "dominant colors", "photo color extractor", "Zelve color palette"],
  openGraph: {
    title: "Color Palette Generator from Image — Free Online Tool",
    description: "Upload any image and extract its dominant colors as hex codes. 100% client-side — no images uploaded to servers.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Palette Generator from Image — Free Online Tool",
    description: "Upload any image and extract its dominant colors as hex codes. 100% client-side — no images uploaded to servers.",
  },
};

export default function ColorPalettePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Color Palette Generator from Image",
            url: "https://toolai.zelve.xyz/tools/color-palette",
            description: "Extract dominant colors from any image instantly. Free online color palette generator.",
            applicationCategory: "DesignApplication",
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
                name: "How does the color palette generator work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Upload any image and the tool analyzes its pixel data using a canvas element in your browser. It quantizes colors and returns the top 6 most dominant colors as hex codes.",
                },
              },
              {
                "@type": "Question",
                name: "Are my images uploaded to a server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All image processing is done entirely in your browser using the HTML5 Canvas API. No images are ever sent to any server.",
                },
              },
              {
                "@type": "Question",
                name: "What image formats are supported?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The tool supports all standard image formats including PNG, JPG, JPEG, WebP, GIF, BMP, and SVG.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use this for design projects?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! This tool is perfect for designers who need to extract color palettes from photos, screenshots, or any other image for use in UI/UX design, branding, and other creative projects.",
                },
              },
            ],
          }),
        }}
      />
      <ColorPaletteTool />
      <SEOContent
        title="About the Color Palette Generator"
        description="The Color Palette Generator extracts dominant colors from any image using client-side canvas analysis. Upload a photo, illustration, or design and instantly get the 6 most prominent colors with their hex codes. Perfect for designers, developers, and anyone looking to build color schemes from inspiration images."
        features={[
          "Extracts 6 dominant colors from any image",
          "Client-side processing — images never leave your device",
          "Click-to-copy hex color codes instantly",
          "Supports JPG, PNG, WebP, and other image formats",
          "Drag-and-drop upload for convenience",
          "Privacy-first: all analysis happens in your browser",
        ]}
        howToUse={[
          "Upload an image by clicking the upload area or dragging and dropping a file.",
          "Wait a moment while the tool analyzes the image colors.",
          "View the extracted color swatches with their hex values.",
          "Click any color code to copy it to your clipboard.",
        ]}
        faq={[
          { question: "How does the tool extract colors?", answer: "It uses HTML5 Canvas to sample pixels from the image, then applies color quantization to group similar colors into 6 dominant clusters. All processing is done locally in your browser." },
          { question: "What image formats are supported?", answer: "The tool supports all common web image formats including JPG, JPEG, PNG, WebP, GIF, and BMP." },
          { question: "Is my image uploaded to a server?", answer: "No. The image is processed entirely in your browser using the Canvas API. Nothing is uploaded to any server." },
        ]}
      />
    </>
  );
}
