import type { Metadata } from "next";
import ImageToPromptTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

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
      <SEOContent
        title="About the Image to Prompt Generator"
        description="The Image to Prompt Generator analyzes any image and generates a detailed text prompt describing its visual elements. Using client-side canvas analysis, it detects dominant colors, brightness, warmth, hue, and saturation to produce structured prompts suitable for Midjourney, DALL-E, and other AI image generators."
        features={[
          "Client-side image analysis using Canvas API",
          "Detects dominant colors, brightness, warmth, and saturation",
          "12 art style options from Photorealistic to Watercolor",
          "10 mood presets from Moody & Dark to Bright & Cheerful",
          "Generates prompts compatible with Midjourney and DALL-E",
          "Copy button for one-click prompt copying",
        ]}
        howToUse={[
          "Upload an image by clicking the upload area or dragging a file.",
          "Select an art style and mood from the dropdown menus.",
          "View the analysis results including color swatches and image metrics.",
          "Copy the generated prompt and use it with your favorite AI image generator.",
        ]}
        faq={[
          { question: "What AI image generators work with these prompts?", answer: "The generated prompts are compatible with Midjourney, DALL-E, Stable Diffusion, and other AI image generation tools that accept text prompts." },
          { question: "How accurate is the image analysis?", answer: "The tool uses canvas-based pixel analysis to detect colors, brightness, and other visual properties. While not as sophisticated as a real AI vision model, it provides useful starting points for prompt generation." },
          { question: "Does the tool use AI to generate prompts?", answer: "The analysis is done using client-side image processing (Canvas API). Prompt generation uses template-based logic combining the detected visual features with your chosen style and mood." },
        ]}
      />
    </>
  );
}
