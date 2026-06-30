import type { Metadata } from "next";
import ImageToPromptTool from "./ToolClient";

export const metadata: Metadata = {
  title: "Image to Prompt Generator — Free AI Prompt Tool | Zelve Tool AI",
  description: "Upload any image and get a detailed AI prompt for Midjourney, DALL-E, and Stable Diffusion. Analyzes colors, mood, composition, and style automatically.",
  keywords: ["image to prompt", "AI prompt generator", "Midjourney prompt", "DALL-E prompt", "Stable Diffusion prompt", "image description AI", "Zelve image to prompt"],
  openGraph: {
    title: "Image to Prompt Generator — Free AI Prompt Tool",
    description: "Upload any image and get a detailed AI prompt for Midjourney, DALL-E, and Stable Diffusion. Analyzes colors, mood, and composition.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Prompt Generator — Free AI Prompt Tool",
    description: "Upload any image and get a detailed AI prompt for Midjourney, DALL-E, and Stable Diffusion. Analyzes colors, mood, and composition.",
  },
};

export default function ImageToPromptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Image to Prompt Generator",
            url: "https://toolai.zelve.xyz/tools/image-to-prompt",
            description: "Upload any image and get a detailed AI prompt for Midjourney, DALL-E, and Stable Diffusion.",
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
                name: "How does the image to prompt generator work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The tool analyzes your image's pixel data to extract dominant colors, brightness, warmth, saturation, and composition. It then generates a detailed text prompt describing the image in a format suitable for AI image generators.",
                },
              },
              {
                "@type": "Question",
                name: "Which AI image generators does this work with?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The generated prompts work with Midjourney, DALL-E, Stable Diffusion, Firefly, and other AI image generation tools. You can also choose from 12 art styles and 10 mood options.",
                },
              },
              {
                "@type": "Question",
                name: "Is my image uploaded anywhere?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All image analysis happens locally in your browser using the Canvas API. Your images never leave your device.",
                },
              },
              {
                "@type": "Question",
                name: "Can I customize the generated prompt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. You can choose from 12 art styles (Photorealistic, Cinematic, Oil Painting, Anime, etc.) and 10 mood options (Moody & Dark, Bright & Cheerful, etc.) to fine-tune the output.",
                },
              },
            ],
          }),
        }}
      />
      <ImageToPromptTool />
    </>
  );
}
