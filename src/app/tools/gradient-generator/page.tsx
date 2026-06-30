import type { Metadata } from "next";
import GradientGeneratorTool from "./ToolClient";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — Free Online Tool | Zelve Tool AI",
  description: "Create beautiful CSS linear gradients with a visual editor. Adjust colors, stops, and angle in real-time. Copy ready-to-use CSS code instantly.",
  keywords: ["CSS gradient generator", "linear gradient tool", "CSS gradient maker", "gradient color picker", "background gradient CSS", "Zelve gradient generator"],
  openGraph: {
    title: "CSS Gradient Generator — Free Online Tool",
    description: "Create beautiful CSS gradients with a visual editor. Adjust colors, stops, and angle in real-time. Copy ready-to-use CSS code.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator — Free Online Tool",
    description: "Create beautiful CSS gradients with a visual editor. Adjust colors, stops, and angle in real-time. Copy ready-to-use CSS code.",
  },
};

export default function GradientGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "CSS Gradient Generator",
            url: "https://toolai.zelve.xyz/tools/gradient-generator",
            description: "Create beautiful CSS linear gradients with a visual editor and copy ready-to-use CSS code.",
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
                name: "How do I use the CSS gradient generator?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Choose your gradient colors using the color pickers, adjust the position of each color stop using the sliders, set the gradient angle, and click Copy to get the CSS code.",
                },
              },
              {
                "@type": "Question",
                name: "Can I add more than two colors?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can add up to 5 color stops. Click the '+ Add color stop' button to add more colors to your gradient.",
                },
              },
              {
                "@type": "Question",
                name: "What is the gradient angle?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The angle controls the direction of the gradient. 0deg goes from bottom to top, 90deg from left to right, 180deg from top to bottom, and so on. You can set any angle from 0 to 360 degrees.",
                },
              },
              {
                "@type": "Question",
                name: "Where can I use the generated CSS?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can use the generated CSS gradient code anywhere CSS is supported — in your stylesheets, inline styles, React components, Tailwind CSS arbitrary values, or any web project.",
                },
              },
            ],
          }),
        }}
      />
      <GradientGeneratorTool />
    </>
  );
}
