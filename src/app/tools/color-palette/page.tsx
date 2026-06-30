import type { Metadata } from "next";
import ColorPaletteTool from "./ToolClient";

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
    </>
  );
}
