import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/80 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Tool<span className="text-emerald-400">AI</span>
            </Link>
            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
              Free online tools for developers, creators, and crypto enthusiasts. No signup required.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">AI Tools</h4>
            <div className="space-y-2 text-sm">
              <Link href="/tools/ai-chatbot" className="block text-zinc-500 hover:text-emerald-400 transition-colors">AI Chatbot</Link>
              <Link href="/tools/ai-humanizer" className="block text-zinc-500 hover:text-emerald-400 transition-colors">AI Humanizer</Link>
              <Link href="/tools/color-palette" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Color Palette</Link>
              <Link href="/tools/qr-generator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">QR Generator</Link>
              <Link href="/tools/image-to-prompt" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Image to Prompt</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">Crypto Tools</h4>
            <div className="space-y-2 text-sm">
              <Link href="/tools/crypto-price-calculator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Price Calculator</Link>
              <Link href="/tools/eth-gas-estimator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Gas Fee Estimator</Link>
              <Link href="/tools/wallet-balance-checker" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Balance Checker</Link>
              <Link href="/tools/crypto-address-validator" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Address Validator</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-300 mb-3">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-zinc-500 hover:text-emerald-400 transition-colors">About</Link>
              <Link href="/blog" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Blog</Link>
              <Link href="/pricing" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Pricing</Link>
              <Link href="/privacy" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} ToolAI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js &amp; Tailwind CSS</span>
            <span className="text-zinc-700">|</span>
            <span>Deployed on Cloudflare</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
