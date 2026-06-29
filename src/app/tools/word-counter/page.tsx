"use client";

import { useState, type ChangeEvent } from "react";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.round(words / 200));
  const speakingTime = Math.max(1, Math.round(words / 150));

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: chars },
    { label: "Characters (no space)", value: charsNoSpace },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Reading Time", value: `${readingTime} min` },
    { label: "Speaking Time", value: `${speakingTime} min` },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Word Counter</h1>
      <p className="text-zinc-400 mb-8">
        Count words, characters, sentences, and paragraphs with reading time estimates.
      </p>

      <textarea
        value={text}
        onChange={handleInput}
        placeholder="Type or paste your text here..."
        rows={10}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y mb-6"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <AdBanner />
      <TipJar />
    </div>
  );
}
