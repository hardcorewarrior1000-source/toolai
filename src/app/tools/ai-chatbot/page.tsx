import type { Metadata } from "next";
import AIChatTool from "./ToolClient";

export const metadata: Metadata = {
  title: "Zelve AI Chat — Free AI Chatbot with Groq & OpenRouter | Zelve Tool AI",
  description: "Free AI chatbot powered by Llama, Gemma, Nemotron, and GPT-OSS models via Groq and OpenRouter. Chat with 6 AI models, 10 free messages/day.",
  keywords: ["AI chatbot", "free AI chat", "Llama chat", "Groq chatbot", "OpenRouter AI", "GPT-OSS", "Nemotron", "Gemma chat", "Zelve AI Chat"],
  openGraph: {
    title: "Zelve AI Chat — Free AI Chatbot with Groq & OpenRouter",
    description: "Chat with 6 powerful AI models for free. Llama 3.1 8B via Groq, plus Llama 3.3 70B, Nemotron, Gemma 4, and GPT-OSS via OpenRouter.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zelve AI Chat — Free AI Chatbot with Groq & OpenRouter",
    description: "Chat with 6 powerful AI models for free. Llama 3.1 8B via Groq, plus Llama 3.3 70B, Nemotron, Gemma 4, and GPT-OSS via OpenRouter.",
  },
};

export default function ZelveAIChatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Zelve AI Chat",
            url: "https://toolai.zelve.xyz/tools/ai-chatbot",
            description: "Free AI chatbot powered by Llama, Gemma, Nemotron, and GPT-OSS models via Groq and OpenRouter.",
            applicationCategory: "UtilityApplication",
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
                name: "Is Zelve AI Chat really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the free tier gives you 10 messages per day powered by Llama 3.1 8B via Groq. Starter plans start at $15/month for 500 messages/day with access to 5 models.",
                },
              },
              {
                "@type": "Question",
                name: "What AI models are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Zelve AI Chat offers 6 models: Llama 3.1 8B (free, via Groq), Llama 3.3 70B, Nemotron 3 Super 120B, Gemma 4 26B, GPT-OSS 20B, and GPT-OSS 120B via OpenRouter.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use Zelve AI Chat without signing up?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can start chatting immediately on the free tier without creating an account. Free users get 10 messages per day.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between Groq and OpenRouter models?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Groq models (like Llama 3.1 8B) are optimized for ultra-fast inference. OpenRouter models provide access to a wider range of models including Nemotron, Gemma, and GPT-OSS with slightly higher latency.",
                },
              },
            ],
          }),
        }}
      />
      <AIChatTool />
    </>
  );
}
