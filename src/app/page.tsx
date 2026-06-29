import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

const aiTools = [
  {
    title: "AI to Human Text",
    description: "Convert AI-generated text to sound more natural and human-like with 60+ transformation rules.",
    href: "/tools/ai-humanizer",
    icon: "🤖",
  },
  {
    title: "Color Palette from Image",
    description: "Upload an image and extract a beautiful color palette instantly.",
    href: "/tools/color-palette",
    icon: "🎨",
  },
  {
    title: "Gradient Generator",
    description: "Create stunning CSS gradients with a visual drag-and-drop editor.",
    href: "/tools/gradient-generator",
    icon: "🌈",
  },
  {
    title: "Image to Base64",
    description: "Convert any image to a Base64 data URL for embedding in code.",
    href: "/tools/image-to-base64",
    icon: "🖼️",
  },
  {
    title: "Image to Prompt",
    description: "Upload any image and get a detailed AI prompt for Midjourney, DALL-E, Stable Diffusion.",
    href: "/tools/image-to-prompt",
    icon: "✨",
  },
  {
    title: "QR Code Generator",
    description: "Generate scannable QR codes from any text or URL with custom error correction.",
    href: "/tools/qr-generator",
    icon: "📱",
  },
];

const devTools = [
  {
    title: "Password Generator",
    description: "Generate cryptographically secure random passwords with custom length and character options.",
    href: "/tools/password-generator",
    icon: "🔐",
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data with syntax error detection.",
    href: "/tools/json-formatter",
    icon: "{}",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs with reading time estimates.",
    href: "/tools/word-counter",
    icon: "📝",
  },
  {
    title: "Text to URL Slug",
    description: "Convert any text into a clean, SEO-friendly URL slug.",
    href: "/tools/text-to-slug",
    icon: "🔗",
  },
];

const cryptoTools = [
  {
    title: "Crypto Price Calculator",
    description: "Live prices for 10+ cryptocurrencies with instant conversion to any fiat currency.",
    href: "/tools/crypto-price-calculator",
    icon: "📊",
  },
  {
    title: "Gas Fee Estimator",
    description: "Live gas prices for Ethereum, Polygon, and BNB Chain with USD cost estimates.",
    href: "/tools/eth-gas-estimator",
    icon: "⛽",
  },
  {
    title: "Wallet Balance Checker",
    description: "Check the balance of any Solana, Ethereum, or Bitcoin wallet address.",
    href: "/tools/wallet-balance-checker",
    icon: "💰",
  },
  {
    title: "Address Validator",
    description: "Validate BTC, ETH, and SOL wallet addresses with checksum verification.",
    href: "/tools/crypto-address-validator",
    icon: "✅",
  },
  {
    title: "Crypto Unit Converter",
    description: "Convert between BTC/sats, ETH/wei/Gwei, and SOL/lamports instantly.",
    href: "/tools/crypto-unit-converter",
    icon: "🔄",
  },
  {
    title: "BIP39 Mnemonic Generator",
    description: "Generate 12 or 24-word seed phrases for development and testing.",
    href: "/tools/mnemonic-generator",
    icon: "🎲",
  },
  {
    title: "Payment Link Generator",
    description: "Create BIP21 and EIP-681 crypto payment URIs for Bitcoin, Ethereum, and Solana.",
    href: "/tools/crypto-payment-link",
    icon: "🔗",
  },
];

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-2xl">{icon}</span>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs text-emerald-400 font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            17 free tools — no signup required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            Free Online{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent animate-gradient">
              AI &amp; Crypto
            </span>{" "}
            Tools
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Fast, free tools for developers, creators, and crypto enthusiasts.
            Everything runs in your browser — no data leaves your device.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/tools/ai-humanizer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/20"
            >
              Try AI Humanizer
            </Link>
            <Link
              href="/tools/crypto-price-calculator"
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-zinc-600 rounded-lg font-medium transition-colors"
            >
              Crypto Prices →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="section-divider mb-10" />

        <SectionHeader icon="🤖" title="AI &amp; Creative Tools" subtitle="Transform text, images, and designs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {aiTools.map((tool) => (
            <ToolCard key={tool.href} {...tool} category="AI" />
          ))}
        </div>

        <div className="section-divider mb-10" />

        <SectionHeader icon="🔧" title="Developer Tools" subtitle="Essential utilities for building software" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {devTools.map((tool) => (
            <ToolCard key={tool.href} {...tool} category="Dev" />
          ))}
        </div>

        <div className="section-divider mb-10" />

        <SectionHeader icon="₿" title="Crypto Tools" subtitle="On-chain data, converters, and utilities" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {cryptoTools.map((tool) => (
            <ToolCard key={tool.href} {...tool} category="Crypto" />
          ))}
        </div>

        <AdBanner />

        <div className="mt-12 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Why ToolAI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-sm">
            <div>
              <span className="text-2xl mb-2 block">🔒</span>
              <h3 className="text-white font-medium mb-1">100% Private</h3>
              <p className="text-zinc-500">All processing happens in your browser. No data is sent to any server.</p>
            </div>
            <div>
              <span className="text-2xl mb-2 block">⚡</span>
              <h3 className="text-white font-medium mb-1">Instant Results</h3>
              <p className="text-zinc-500">No waiting, no loading screens. Get results as you type or upload.</p>
            </div>
            <div>
              <span className="text-2xl mb-2 block">💰</span>
              <h3 className="text-white font-medium mb-1">Completely Free</h3>
              <p className="text-zinc-500">All 17 tools are free to use. No signup, no credit card, no limits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
