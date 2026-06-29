"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Tool<span className="text-emerald-400">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-400 flex-wrap justify-end">
          <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
          <Link href="/tools/ai-humanizer" className="hover:text-white transition-colors whitespace-nowrap">AI Humanizer</Link>
          <Link href="/tools/color-palette" className="hover:text-white transition-colors whitespace-nowrap">Palette</Link>
          <Link href="/tools/gradient-generator" className="hover:text-white transition-colors whitespace-nowrap">Gradient</Link>
          <Link href="/tools/image-to-base64" className="hover:text-white transition-colors whitespace-nowrap">Base64</Link>
          <Link href="/tools/word-counter" className="hover:text-white transition-colors whitespace-nowrap">Words</Link>
          <Link href="/tools/text-to-slug" className="hover:text-white transition-colors whitespace-nowrap">Slug</Link>
          <Link href="/tools/qr-generator" className="hover:text-white transition-colors whitespace-nowrap">QR</Link>
          <Link href="/tools/image-to-prompt" className="hover:text-white transition-colors whitespace-nowrap">Img→Prompt</Link>
          <Link href="/about" className="hover:text-white transition-colors whitespace-nowrap">About</Link>
        </nav>

        <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 flex flex-col gap-3 text-sm text-zinc-400">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-white">Home</Link>
          <Link href="/tools/ai-humanizer" onClick={() => setOpen(false)} className="hover:text-white">AI Humanizer</Link>
          <Link href="/tools/color-palette" onClick={() => setOpen(false)} className="hover:text-white">Color Palette</Link>
          <Link href="/tools/gradient-generator" onClick={() => setOpen(false)} className="hover:text-white">Gradient Generator</Link>
          <Link href="/tools/image-to-base64" onClick={() => setOpen(false)} className="hover:text-white">Image to Base64</Link>
          <Link href="/tools/word-counter" onClick={() => setOpen(false)} className="hover:text-white">Word Counter</Link>
          <Link href="/tools/text-to-slug" onClick={() => setOpen(false)} className="hover:text-white">Text to Slug</Link>
          <Link href="/tools/qr-generator" onClick={() => setOpen(false)} className="hover:text-white">QR Generator</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="hover:text-white">About</Link>
        </div>
      )}
    </header>
  );
}
