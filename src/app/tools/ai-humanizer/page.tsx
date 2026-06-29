"use client";

import { useState, type ChangeEvent } from "react";
import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";

const aiPatterns: [RegExp, string][] = [
  [/\bas an AI\b/gi, ""],
  [/\bI'm (just )?an AI\b/gi, ""],
  [/\b(as )?an AI language model\b/gi, ""],
  [/\bI cannot\b/gi, "I can't"],
  [/\bI am\b/gi, "I'm"],
  [/\byou are\b/gi, "you're"],
  [/\bit is\b/gi, "it's"],
  [/\bthat is\b/gi, "that's"],
  [/\bdid not\b/gi, "didn't"],
  [/\bdo not\b/gi, "don't"],
  [/\bdoes not\b/gi, "doesn't"],
  [/\bwill not\b/gi, "won't"],
  [/\bcannot\b/gi, "can't"],
  [/\bcould not\b/gi, "couldn't"],
  [/\bwould not\b/gi, "wouldn't"],
  [/\bshould not\b/gi, "shouldn't"],
  [/\bhas not\b/gi, "hasn't"],
  [/\bhave not\b/gi, "haven't"],
  [/\bwas not\b/gi, "wasn't"],
  [/\bwere not\b/gi, "weren't"],
  [/\bis not\b/gi, "isn't"],
  [/\bare not\b/gi, "aren't"],
  [/\bhowever,\s*/gi, "But "],
  [/\bfurthermore,\s*/gi, "Plus, "],
  [/\bin conclusion,\s*/gi, "So, "],
  [/\badditionally,\s*/gi, "Also, "],
  [/\bnevertheless,\s*/gi, "Still, "],
  [/\bconsequently,\s*/gi, "So "],
  [/\bmoreover,\s*/gi, "And "],
  [/\bnonetheless\b/gi, "still"],
  [/\bthus\b/gi, "so"],
  [/\bregarding\b/gi, "about"],
  [/\bapproximately\b/gi, "roughly"],
  [/\bcommence\b/gi, "start"],
  [/\bterminate\b/gi, "end"],
  [/\butilize\b/gi, "use"],
  [/\bsubsequent\b/gi, "next"],
  [/\bprior to\b/gi, "before"],
  [/\bnumerous\b/gi, "many"],
  [/\bendeavor\b/gi, "try"],
  [/\bfacilitate\b/gi, "help"],
  [/\bimplement\b/gi, "set up"],
  [/\bparameters\b/gi, "settings"],
  [/\bdue to the fact that\b/gi, "because"],
  [/\bin the event that\b/gi, "if"],
  [/\bwith the exception of\b/gi, "except for"],
  [/\bin order to\b/gi, "to"],
];

function humanize(text: string): string {
  let result = text;
  for (const [pattern, replacement] of aiPatterns) {
    result = result.replace(pattern, replacement);
  }
  return result.trim();
}

export default function AIHumanizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    setOutput(humanize(val));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">AI to Human Text Converter</h1>
      <p className="text-zinc-400 mb-8">
        Paste AI-generated text and instantly make it sound more natural and human-like.
      </p>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">AI-Generated Text</label>
          <textarea
            value={input}
            onChange={handleInput}
            placeholder="Paste AI-generated text here..."
            rows={8}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-300">Humanized Output</label>
            {output && (
              <button
                onClick={copyOutput}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Copy
              </button>
            )}
          </div>
          <div className="w-full min-h-[120px] bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 whitespace-pre-wrap">
            {output || <span className="text-zinc-600">Humanized text will appear here...</span>}
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-zinc-500">
        <p>
          <strong className="text-zinc-400">How it works:</strong> Replaces AI telltale phrases,
          adds contractions, and substitutes formal words with natural alternatives. 100% client-side.
        </p>
      </div>

      <AdBanner />
      <TipJar />
    </div>
  );
}
