import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { WALLETS } from "@/lib/wallets";

export const metadata: Metadata = {
  title: "About Zelve Tool AI — Free Online Tools for Everyone",
  description: "Learn about Zelve Tool AI — a free, privacy-first platform with 18+ browser-based tools for developers, creators, and crypto enthusiasts. No signup, no data collection.",
  openGraph: {
    title: "About Zelve Tool AI",
    description: "Free, privacy-first online tools for developers, creators, and crypto enthusiasts.",
    url: "https://toolai.zelve.xyz/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">About Zelve Tool AI</h1>

      <div className="space-y-6 text-zinc-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Our Mission</h2>
          <p>
            Zelve Tool AI was built with a simple goal: make powerful tools accessible to everyone, for free.
            We believe that developers, creators, and crypto enthusiasts shouldn&apos;t need expensive subscriptions
            or complex setups to get things done. Every tool runs entirely in your browser — fast, private, and free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">What We Offer</h2>
          <p>
            We provide 18+ free online tools across three categories:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong className="text-zinc-300">AI & Creative Tools:</strong> AI Chat, AI Humanizer, Color Palette, Gradient Generator, Image to Base64, Image to Prompt, QR Code Generator</li>
            <li><strong className="text-zinc-300">Developer Tools:</strong> Password Generator, JSON Formatter, Word Counter, Text to URL Slug</li>
            <li><strong className="text-zinc-300">Crypto Tools:</strong> Price Calculator, Gas Fee Estimator, Wallet Balance Checker, Address Validator, Unit Converter, Mnemonic Generator, Payment Link Generator</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Privacy First</h2>
          <p>
            Your privacy is our top priority. Every tool processes data locally in your browser.
            Nothing is uploaded to any server. No accounts required. No tracking. No data collection.
            When you use Zelve Tool AI, your data stays on your device — always.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">How We&apos;re Supported</h2>
          <p>
            Zelve Tool AI is free to use and will always be. We support the platform through
            non-intrusive ads (only for free tier users) and optional crypto donations.
            If you find our tools useful, consider sending a small tip to help us keep the lights on.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Built With</h2>
          <p>
            Zelve Tool AI is built with Next.js, React, and Tailwind CSS. It&apos;s deployed on
            Cloudflare Pages for fast, global access. The AI Chat feature uses Groq and OpenRouter
            for inference on open-source models like Llama, Gemma, and GPT-OSS.
          </p>
        </section>
      </div>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Support Us</h2>
        <p className="text-zinc-500 text-sm mb-4">
          If you find Zelve Tool AI useful, consider sending a tip. Your support helps us keep the tools free for everyone.
        </p>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-zinc-500">Solana:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              {WALLETS.solana.address}
            </div>
          </div>
          <div>
            <span className="text-zinc-500">Ethereum / BSC / Polygon:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              {WALLETS.ethereum.address}
            </div>
          </div>
          <div>
            <span className="text-zinc-500">Bitcoin:</span>
            <div className="font-mono text-emerald-400 mt-1 break-all text-xs">
              {WALLETS.bitcoin.address}
            </div>
          </div>
        </div>
      </div>

      <AdBanner />
    </div>
  );
}
