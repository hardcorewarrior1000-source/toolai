import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";
import Link from "next/link";
import {
  AiChatIcon,
  AiHumanizerIcon,
  ColorPaletteIcon,
  GradientIcon,
  Base64Icon,
  ImagePromptIcon,
  QrCodeIcon,
  PasswordIcon,
  JsonIcon,
  WordCounterIcon,
  SlugIcon,
  CryptoPriceIcon,
  GasIcon,
  WalletIcon,
  ValidatorIcon,
  ConverterIcon,
  MnemonicIcon,
  PaymentLinkIcon,
} from "@/components/icons/ToolIcons";

const aiTools = [
  { title: "Zelve AI Chat", description: "Chat with AI models for free — Nemotron, Gemma, and GPT-OSS. No API key needed.", href: "/tools/ai-chatbot", icon: <AiChatIcon />, category: "AI", popular: true },
  { title: "AI to Human Text", description: "Convert AI-generated text to sound natural and human-like with 60+ transformations.", href: "/tools/ai-humanizer", icon: <AiHumanizerIcon />, category: "AI", popular: true },
  { title: "Color Palette from Image", description: "Upload an image and extract a beautiful color palette instantly.", href: "/tools/color-palette", icon: <ColorPaletteIcon />, category: "AI" },
  { title: "Gradient Generator", description: "Create stunning CSS gradients with a visual editor.", href: "/tools/gradient-generator", icon: <GradientIcon />, category: "AI" },
  { title: "Image to Base64", description: "Convert any image to a Base64 data URL for embedding in code.", href: "/tools/image-to-base64", icon: <Base64Icon />, category: "AI" },
  { title: "Image to Prompt", description: "Get a detailed AI prompt for Midjourney, DALL-E, Stable Diffusion.", href: "/tools/image-to-prompt", icon: <ImagePromptIcon />, category: "AI" },
  { title: "QR Code Generator", description: "Generate scannable QR codes from any text or URL.", href: "/tools/qr-generator", icon: <QrCodeIcon />, category: "AI", popular: true },
];

const devTools = [
  { title: "Password Generator", description: "Generate cryptographically secure random passwords.", href: "/tools/password-generator", icon: <PasswordIcon />, category: "Dev" },
  { title: "JSON Formatter", description: "Format, validate, and minify JSON data with error detection.", href: "/tools/json-formatter", icon: <JsonIcon />, category: "Dev" },
  { title: "Word Counter", description: "Count words, characters, sentences with reading time.", href: "/tools/word-counter", icon: <WordCounterIcon />, category: "Dev" },
  { title: "Text to URL Slug", description: "Convert text into a clean, SEO-friendly URL slug.", href: "/tools/text-to-slug", icon: <SlugIcon />, category: "Dev" },
];

const cryptoTools = [
  { title: "Crypto Price Calculator", description: "Live prices for 10+ cryptocurrencies with instant conversion.", href: "/tools/crypto-price-calculator", icon: <CryptoPriceIcon />, category: "Crypto", popular: true },
  { title: "Gas Fee Estimator", description: "Live gas prices for Ethereum, Polygon, and BNB Chain.", href: "/tools/eth-gas-estimator", icon: <GasIcon />, category: "Crypto" },
  { title: "Wallet Balance Checker", description: "Check the balance of any Solana, Ethereum, or Bitcoin wallet.", href: "/tools/wallet-balance-checker", icon: <WalletIcon />, category: "Crypto" },
  { title: "Address Validator", description: "Validate BTC, ETH, and SOL wallet addresses.", href: "/tools/crypto-address-validator", icon: <ValidatorIcon />, category: "Crypto" },
  { title: "Crypto Unit Converter", description: "Convert between BTC/sats, ETH/wei/Gwei, SOL/lamports.", href: "/tools/crypto-unit-converter", icon: <ConverterIcon />, category: "Crypto" },
  { title: "BIP39 Mnemonic Generator", description: "Generate 12 or 24-word seed phrases for development.", href: "/tools/mnemonic-generator", icon: <MnemonicIcon />, category: "Crypto" },
  { title: "Payment Link Generator", description: "Create BIP21 and EIP-681 crypto payment URIs.", href: "/tools/crypto-payment-link", icon: <PaymentLinkIcon />, category: "Crypto" },
];

const featuredTools = [
  {
    title: "Zelve AI Chat",
    description: "Chat with powerful AI models for free. Nemotron 3 Super, Gemma 4, and GPT-OSS — no API key required.",
    href: "/tools/ai-chatbot",
    icon: <AiChatIcon className="w-8 h-8" />,
    tag: "Most Popular",
    color: "emerald",
  },
  {
    title: "AI Humanizer",
    description: "Transform robotic AI text into natural, human-sounding content with 60+ transformation rules.",
    href: "/tools/ai-humanizer",
    icon: <AiHumanizerIcon className="w-8 h-8" />,
    tag: "Essential",
    color: "emerald",
  },
  {
    title: "Crypto Price Calculator",
    description: "Live prices for 10+ cryptocurrencies with instant fiat conversion. Real-time market data.",
    href: "/tools/crypto-price-calculator",
    icon: <CryptoPriceIcon className="w-8 h-8" />,
    tag: "Live Data",
    color: "amber",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Pick a Tool",
    description: "Browse our collection of 18 free tools for AI, development, and crypto.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Use in Browser",
    description: "Everything runs locally in your browser — no data is sent to any server.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Get Instant Results",
    description: "No waiting, no signup, no credit card. Get results immediately.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section — Split Layout */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-xs text-emerald-400 font-medium mb-6 animate-fade-in">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                18 free tools — no signup required
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Free Online{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent animate-gradient">
                  AI &amp; Crypto
                </span>{" "}
                Tools
              </h1>

              <p className="text-zinc-400 text-lg max-w-lg mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Fast, free tools for developers, creators, and crypto enthusiasts.
                Everything runs in your browser — no data leaves your device.
              </p>

              <div className="flex items-center gap-3 flex-wrap animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link
                  href="/tools/ai-chatbot"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105"
                >
                  Zelve AI Chat
                </Link>
                <Link
                  href="/tools/ai-humanizer"
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-zinc-600 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  Try AI Humanizer →
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl font-bold text-emerald-400">18+</span>
                  <span className="text-zinc-500">Tools</span>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl font-bold text-emerald-400">100%</span>
                  <span className="text-zinc-500">Private</span>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl font-bold text-emerald-400">0$</span>
                  <span className="text-zinc-500">Cost</span>
                </div>
              </div>
            </div>

            {/* Right: Tool Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                {[...aiTools.slice(0, 3), ...devTools.slice(0, 2), ...cryptoTools.slice(0, 4)].map((tool, i) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-4 hover:border-emerald-500/30 transition-all duration-300 group"
                    style={{ animationDelay: `${0.4 + i * 0.05}s` }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      tool.category === "AI" ? "bg-emerald-500/10 text-emerald-400" :
                      tool.category === "Dev" ? "bg-blue-500/10 text-blue-400" :
                      "bg-amber-500/10 text-amber-400"
                    }`}>
                      {tool.icon}
                    </div>
                    <p className="text-xs font-medium text-white group-hover:text-emerald-400 transition-colors truncate">{tool.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* How It Works */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-zinc-500 text-sm">Three simple steps to get started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  {step.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">Step {step.step}: {step.title}</h3>
                <p className="text-zinc-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider mb-12" />

        {/* Featured Tools */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Featured Tools</h2>
            <p className="text-zinc-500 text-sm">Our most popular tools to get you started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tool.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}>
                    {tool.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">{tool.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{tool.description}</p>
                <div className="mt-4 text-emerald-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Try now →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <InContentAd />

        <div className="section-divider my-12" />

        {/* AI & Creative Tools */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">AI &amp; Creative Tools</h2>
              <p className="text-sm text-zinc-500">Transform text, images, and designs</p>
            </div>
            <Link href="/tools/ai-humanizer" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTools.slice(0, 4).map((tool, i) => (
              <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {aiTools.slice(4).map((tool, i) => (
              <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${(i + 4) * 0.05}s` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </section>

        <InContentAd />

        <div className="section-divider my-12" />

        {/* Developer Tools */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Developer Tools</h2>
              <p className="text-sm text-zinc-500">Essential utilities for building software</p>
            </div>
            <Link href="/tools/password-generator" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {devTools.map((tool, i) => (
              <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider my-12" />

        {/* Crypto Tools */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Crypto Tools</h2>
              <p className="text-sm text-zinc-500">On-chain data, converters, and utilities</p>
            </div>
            <Link href="/tools/crypto-price-calculator" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cryptoTools.slice(0, 4).map((tool, i) => (
              <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {cryptoTools.slice(4).map((tool, i) => (
              <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${(i + 4) * 0.05}s` }}>
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </section>

        <AdBanner />

        {/* Why Zelve Tool AI */}
        <section className="mt-12 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Why Zelve Tool AI?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1">100% Private</h3>
              <p className="text-zinc-500">All processing happens in your browser. No data is sent to any server.</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1">Instant Results</h3>
              <p className="text-zinc-500">No waiting, no loading screens. Get results as you type or upload.</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-white font-medium mb-1">Completely Free</h3>
              <p className="text-zinc-500">All 18 tools are free to use. No signup, no credit card, no limits.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
