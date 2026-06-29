"use client";

import { useState, type ChangeEvent } from "react";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";

export default function TextToSlugPage() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const slug = (lowercase ? input.trim().toLowerCase() : input.trim())
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, separator)
    .replace(/-+/g, separator)
    .replace(/^-+|-+$/g, "");

  const copySlug = () => {
    navigator.clipboard.writeText(slug);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Text to URL Slug Converter</h1>
      <p className="text-zinc-400 mb-8">
        Convert any text into a clean, SEO-friendly URL slug.
      </p>

      <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Type your text here..."
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
      />

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <span>Separator:</span>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
            <option value="">None</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="accent-emerald-500"
          />
          Lowercase
        </label>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400">Slug Output</span>
          {slug && (
            <button
              onClick={copySlug}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Copy
            </button>
          )}
        </div>
        <div className="text-zinc-100 break-all">
          {slug || <span className="text-zinc-600">Slug will appear here...</span>}
        </div>
      </div>

      <div className="mt-6 text-sm text-zinc-500">
        <p>Useful for URLs, file names, and SEO-friendly permalinks.</p>
      </div>

      <AdBanner />
      <TipJar />
    </div>
  );
}
