import type { Metadata } from "next";
import AIChatTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

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
      <SEOContent
        title="About Zelve AI Chat"
        description="Zelve AI Chat is a free AI chatbot playground that lets you chat with multiple large language models directly in your browser. Powered by Groq for ultra-fast inference and OpenRouter for access to a wider model selection, it supports Llama, Nemotron, Gemma, and GPT-OSS models. No API key required for the free tier."
        features={[
          "6 AI models available: Llama 3.1 8B, Llama 3.3 70B, Nemotron, Gemma 4, GPT-OSS 20B, GPT-OSS 120B",
          "Real-time streaming responses displayed token by token",
          "Supports Groq (ultra-fast) and OpenRouter (broader model access)",
          "Markdown rendering for formatted AI responses",
          "100% private — your API key never leaves your browser",
          "No signup required for the free tier",
        ]}
        howToUse={[
          "Select your preferred AI provider (Groq for speed, OpenRouter for model variety).",
          "Choose a model from the dropdown — free tier uses Llama 3.1 8B via Groq.",
          "Type your message and press Enter or click Send.",
          "Watch the response stream in real-time. Use Copy or Clear buttons as needed.",
        ]}
        faq={[
          { question: "Do I need an API key?", answer: "The free tier works without any API key — you get 10 messages per day powered by Llama 3.1 8B via Groq. For more messages and model access, upgrade to Starter or bring your own API key." },
          { question: "Which model should I use?", answer: "For speed, use Llama 3.1 8B via Groq. For more capable responses, use Llama 3.3 70B or Nemotron 120B via OpenRouter. GPT-OSS models are good for code and technical tasks." },
          { question: "Is my conversation private?", answer: "Yes. Messages are sent directly from your browser to the AI provider's API. Zelve Tool AI never sees, stores, or logs your conversations." },
        ]}
      />
    </>
  );
}
