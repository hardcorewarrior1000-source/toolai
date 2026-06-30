import type { Metadata } from "next";
import Link from "next/link";
import InContentAd from "@/components/InContentAd";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about AI tools, tips, and tutorials from Zelve Tool AI.",
};

const posts = [
  {
    slug: "how-to-humanize-ai-text",
    title: "How to Humanize AI Text: A Complete Guide",
    excerpt: "Learn how to make AI-generated content sound natural, engaging, and human-like with practical techniques.",
    date: "2026-06-29",
  },
  {
    slug: "best-free-ai-tools-2026",
    title: "Best Free AI Tools (2026)",
    excerpt: "A curated list of the best free AI tools for writing, design, development, and more.",
    date: "2026-06-28",
  },
  {
    slug: "what-is-image-to-prompt",
    title: "What Is Image to Prompt? A Beginner's Guide",
    excerpt: "Discover how reverse prompt engineering works and how to use AI to describe images.",
    date: "2026-06-27",
  },
  {
    slug: "how-to-generate-secure-passwords-online",
    title: "How to Generate Secure Passwords Online (And Why You Should)",
    excerpt: "Weak passwords are the #1 cause of account breaches. Learn how to create uncrackable passwords with free online tools.",
    date: "2026-06-24",
  },
  {
    slug: "format-json-online-free",
    title: "How to Format JSON Online — Free Tool for Developers",
    excerpt: "Messy JSON making your life hard? Here's how to format, validate, and minify JSON in seconds with a free browser tool.",
    date: "2026-06-23",
  },
  {
    slug: "what-is-a-qr-code",
    title: "What Is a QR Code? How QR Codes Work and How to Make One for Free",
    excerpt: "QR codes are everywhere. Learn how they work, what they're used for, and how to create your own for free.",
    date: "2026-06-25",
  },
  {
    slug: "best-free-online-tools-developers-2026",
    title: "Best Free Online Tools for Developers (2026)",
    excerpt: "From JSON formatters to base64 converters — the essential free browser-based tools every developer needs.",
    date: "2026-06-20",
  },
  {
    slug: "convert-image-to-base64-string",
    title: "How to Convert an Image to Base64 String Online",
    excerpt: "Need to embed images in HTML or CSS? Learn how to convert any image to a Base64 data URL with a free tool.",
    date: "2026-06-15",
  },
  {
    slug: "how-to-validate-bitcoin-address",
    title: "How to Validate a Bitcoin Address (P2PKH, Bech32, Taproot)",
    excerpt: "Learn how to verify Bitcoin wallet addresses using checksum validation — supporting Legacy, SegWit, and Taproot formats.",
    date: "2026-06-22",
  },
  {
    slug: "eth-to-wei-converter-guide",
    title: "ETH to Wei Converter: Understanding Ethereum Units",
    excerpt: "A complete guide to Ethereum's unit system — from Wei to Gwei to ETH — with a free conversion tool for developers.",
    date: "2026-06-21",
  },
  {
    slug: "best-free-crypto-price-calculator-2026",
    title: "Best Free Crypto Price Calculator (2026)",
    excerpt: "Compare live cryptocurrency prices across 10+ coins and 7 fiat currencies with a free browser-based calculator.",
    date: "2026-06-20",
  },
  {
    slug: "understanding-ethereum-gas-fees",
    title: "Understanding Ethereum Gas Fees: A Practical Guide",
    excerpt: "What are gas fees, why do they vary, and how can you save money on Ethereum, Polygon, and BNB Chain transactions?",
    date: "2026-06-19",
  },
  {
    slug: "how-to-check-wallet-balance",
    title: "How to Check Wallet Balance for Any Crypto (ETH, SOL, BTC)",
    excerpt: "Enter any wallet address and check its balance on Ethereum, Solana, or Bitcoin — free tool, no signup needed.",
    date: "2026-06-18",
  },
  {
    slug: "what-is-bip39-mnemonic-phrase",
    title: "What Is a BIP39 Mnemonic Phrase? Seed Phrase Security Guide",
    excerpt: "Learn how BIP39 mnemonic phrases work, why they matter for crypto security, and how to generate them safely for testing.",
    date: "2026-06-17",
  },
  {
    slug: "how-to-create-crypto-payment-link",
    title: "How to Create a Crypto Payment Link (BIP21, EIP-681)",
    excerpt: "Generate QR-code-ready payment URIs for Bitcoin, Ethereum, and Solana with a free online tool.",
    date: "2026-06-16",
  },
  {
    slug: "free-ai-chatbot-playground-no-signup",
    title: "Free AI Chatbot Playground — No Signup, No Data Collection",
    excerpt: "Chat with GPT-4o and Gemini directly in your browser. Paste your API key and start talking — your data never leaves your device.",
    date: "2026-06-15",
  },
  {
    slug: "best-free-ai-chatbot-2026",
    title: "Best Free AI Chatbot 2026 — No API Key Required",
    excerpt: "Zelve AI Chat connects to Groq's free models — no account, no API key, no data collection. Compare it with paid alternatives like ChatGPT Plus and Claude Pro.",
    date: "2026-06-14",
  },
  {
    slug: "how-to-humanize-chatgpt-text",
    title: "How to Make ChatGPT Text Sound Human (2026 Guide)",
    excerpt: "Stop your AI content from sounding robotic. Learn proven techniques to humanize ChatGPT text and use Zelve Tool AI's free humanizer for instant results.",
    date: "2026-06-12",
  },
  {
    slug: "best-free-crypto-tools-2026",
    title: "Best Free Crypto Tools for Developers (2026)",
    excerpt: "A complete guide to all 7 free crypto tools — from price calculators to mnemonic generators. Compare with paid alternatives and find your ideal toolkit.",
    date: "2026-06-10",
  },
  {
    slug: "how-to-check-crypto-wallet-balance",
    title: "How to Check Any Crypto Wallet Balance for Free",
    excerpt: "Step-by-step guide to checking ETH, SOL, and BTC wallet balances using Zelve Tool AI's free balance checker — no API key or signup needed.",
    date: "2026-06-08",
  },
  {
    slug: "free-online-developer-tools-2026",
    title: "17 Free Online Developer Tools You Need in 2026",
    excerpt: "The complete roundup of every free tool on Zelve Tool AI — AI, crypto, and developer utilities all in one place, no signup required.",
    date: "2026-06-05",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Blog</h1>

      <div className="space-y-6">
        {posts.map((post, i) => (
          <div key={post.slug}>
            <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-zinc-400 text-sm mb-3">{post.excerpt}</p>
              <time className="text-xs text-zinc-600">{post.date}</time>
            </article>
            {(i === 3 || i === 7 || i === 11) && <InContentAd />}
          </div>
        ))}
      </div>
    </div>
  );
}
