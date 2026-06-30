import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";
import Link from "next/link";

const aiTools = [
  { title: "AI Chatbot Playground", description: "Paste your API key and chat with GPT-4o or Gemini directly in your browser. Streaming responses.", href: "/tools/ai-chatbot", icon: "\uD83D\uDCAC" },
  { title: "AI to Human Text", description: "Convert AI-generated text to sound more natural and human-like with 60+ transformation rules.", href: "/tools/ai-humanizer", icon: "\uD83E\uDD16" },
  { title: "Color Palette from Image", description: "Upload an image and extract a beautiful color palette instantly.", href: "/tools/color-palette", icon: "\uD83C\uDFA8" },
  { title: "Gradient Generator", description: "Create stunning CSS gradients with a visual drag-and-drop editor.", href: "/tools/gradient-generator", icon: "\uD83C\uDF08" },
  { title: "Image to Base64", description: "Convert any image to a Base64 data URL for embedding in code.", href: "/tools/image-to-base64", icon: "\uD83D\uDDBC\uFE0F" },
  { title: "Image to Prompt", description: "Upload any image and get a detailed AI prompt for Midjourney, DALL-E, Stable Diffusion.", href: "/tools/image-to-prompt", icon: "\u2728" },
  { title: "QR Code Generator", description: "Generate scannable QR codes from any text or URL with custom error correction.", href: "/tools/qr-generator", icon: "\uD83D\uDCF1" },
];

const devTools = [
  { title: "Password Generator", description: "Generate cryptographically secure random passwords with custom length and character options.", href: "/tools/password-generator", icon: "\uD83D\uDD10" },
  { title: "JSON Formatter", description: "Format, validate, and minify JSON data with syntax error detection.", href: "/tools/json-formatter", icon: "{}" },
  { title: "Word Counter", description: "Count words, characters, sentences, and paragraphs with reading time estimates.", href: "/tools/word-counter", icon: "\uD83D\uDCDD" },
  { title: "Text to URL Slug", description: "Convert any text into a clean, SEO-friendly URL slug.", href: "/tools/text-to-slug", icon: "\uD83D\uDD17" },
];

const cryptoTools = [
  { title: "Crypto Price Calculator", description: "Live prices for 10+ cryptocurrencies with instant conversion to any fiat currency.", href: "/tools/crypto-price-calculator", icon: "\uD83D\uDCCA" },
  { title: "Gas Fee Estimator", description: "Live gas prices for Ethereum, Polygon, and BNB Chain with USD cost estimates.", href: "/tools/eth-gas-estimator", icon: "\u26FD" },
  { title: "Wallet Balance Checker", description: "Check the balance of any Solana, Ethereum, or Bitcoin wallet address.", href: "/tools/wallet-balance-checker", icon: "\uD83D\uDCB0" },
  { title: "Address Validator", description: "Validate BTC, ETH, and SOL wallet addresses with checksum verification.", href: "/tools/crypto-address-validator", icon: "\u2705" },
  { title: "Crypto Unit Converter", description: "Convert between BTC/sats, ETH/wei/Gwei, and SOL/lamports instantly.", href: "/tools/crypto-unit-converter", icon: "\uD83D\uDD04" },
  { title: "BIP39 Mnemonic Generator", description: "Generate 12 or 24-word seed phrases for development and testing.", href: "/tools/mnemonic-generator", icon: "\uD83C\uDFB2" },
  { title: "Payment Link Generator", description: "Create BIP21 and EIP-681 crypto payment URIs for Bitcoin, Ethereum, and Solana.", href: "/tools/crypto-payment-link", icon: "\uD83D\uDD17" },
];

const stats = [
  { value: "18+", label: "Free Tools" },
  { value: "100%", label: "Private" },
  { value: "0$", label: "Cost" },
  { value: "<1s", label: "Results" },
];

export default function Home() {
  return (
    <div>
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl animate-float opacity-20" style={{ animationDelay: "0s" }}>{ "\uD83E\uDD16" }</div>
          <div className="absolute top-32 right-20 text-3xl animate-float opacity-15" style={{ animationDelay: "1s" }}>{ "\uD83D\uDD10" }</div>
          <div className="absolute bottom-20 left-1/4 text-3xl animate-float opacity-15" style={{ animationDelay: "2s" }}>{ "\uD83D\uDCB0" }</div>
          <div className="absolute top-40 left-1/3 text-2xl animate-float opacity-10" style={{ animationDelay: "0.5s" }}>{ "\u26FD" }</div>
          <div className="absolute bottom-32 right-1/3 text-4xl animate-float opacity-10" style={{ animationDelay: "1.5s" }}>{ "\uD83C\uDFA8" }</div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs text-emerald-400 font-medium mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            18 free tools — no signup required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Free Online{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent animate-gradient">
              AI &amp; Crypto
            </span>{" "}
            Tools
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Fast, free tools for developers, creators, and crypto enthusiasts.
            Everything runs in your browser — no data leaves your device.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/tools/ai-humanizer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105"
            >
              Try AI Humanizer
            </Link>
            <Link
              href="/tools/crypto-price-calculator"
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-zinc-600 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Crypto Prices →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-xs text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="section-divider mb-10" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{ "\uD83E\uDD16" }</span>
            <div>
              <h2 className="text-xl font-bold text-white">AI &amp; Creative Tools</h2>
              <p className="text-sm text-zinc-500">Transform text, images, and designs</p>
            </div>
          </div>
          <Link href="/tools/ai-humanizer" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all {aiTools.length} →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {aiTools.map((tool, i) => (
            <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <ToolCard {...tool} category="AI" />
            </div>
          ))}
        </div>

        <InContentAd />

        <div className="section-divider my-10" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{ "\uD83D\uDD27" }</span>
            <div>
              <h2 className="text-xl font-bold text-white">Developer Tools</h2>
              <p className="text-sm text-zinc-500">Essential utilities for building software</p>
            </div>
          </div>
          <Link href="/tools/password-generator" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all {devTools.length} →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {devTools.map((tool, i) => (
            <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <ToolCard {...tool} category="Dev" />
            </div>
          ))}
        </div>

        <InContentAd />

        <div className="section-divider my-10" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{ "\u20BF" }</span>
            <div>
              <h2 className="text-xl font-bold text-white">Crypto Tools</h2>
              <p className="text-sm text-zinc-500">On-chain data, converters, and utilities</p>
            </div>
          </div>
          <Link href="/tools/crypto-price-calculator" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all {cryptoTools.length} →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {cryptoTools.map((tool, i) => (
            <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <ToolCard {...tool} category="Crypto" />
            </div>
          ))}
        </div>

        <AdBanner />

        <div className="mt-12 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Why Zelve Tool AI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-sm">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <span className="text-2xl mb-2 block">{ "\uD83D\uDD12" }</span>
              <h3 className="text-white font-medium mb-1">100% Private</h3>
              <p className="text-zinc-500">All processing happens in your browser. No data is sent to any server.</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <span className="text-2xl mb-2 block">{ "\u26A1" }</span>
              <h3 className="text-white font-medium mb-1">Instant Results</h3>
              <p className="text-zinc-500">No waiting, no loading screens. Get results as you type or upload.</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <span className="text-2xl mb-2 block">{ "\uD83D\uDCB0" }</span>
              <h3 className="text-white font-medium mb-1">Completely Free</h3>
              <p className="text-zinc-500">All 18 tools are free to use. No signup, no credit card, no limits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
