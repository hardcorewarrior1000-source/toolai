"use client";

import { useState, type ChangeEvent, useCallback, useMemo } from "react";
import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";
import TipJar from "@/components/TipJar";
import ToolGate from "@/components/ToolGate";
import { useSubscription } from "@/components/SubscriptionProvider";

const contractions: [RegExp, string][] = [
  [/\bI am\b/gi, "I'm"], [/\byou are\b/gi, "you're"], [/\bthey are\b/gi, "they're"],
  [/\bwe are\b/gi, "we're"], [/\bit is\b/gi, "it's"], [/\bthat is\b/gi, "that's"],
  [/\bwhat is\b/gi, "what's"], [/\bthere is\b/gi, "there's"], [/\bhere is\b/gi, "here's"],
  [/\bdid not\b/gi, "didn't"], [/\bdo not\b/gi, "don't"], [/\bdoes not\b/gi, "doesn't"],
  [/\bwill not\b/gi, "won't"], [/\bcannot\b/gi, "can't"], [/\bcould not\b/gi, "couldn't"],
  [/\bwould not\b/gi, "wouldn't"], [/\bshould not\b/gi, "shouldn't"],
  [/\bhas not\b/gi, "hasn't"], [/\bhave not\b/gi, "haven't"],
  [/\bwas not\b/gi, "wasn't"], [/\bwere not\b/gi, "weren't"],
  [/\bis not\b/gi, "isn't"], [/\bare not\b/gi, "aren't"],
  [/\bcould have\b/gi, "could've"], [/\bwould have\b/gi, "would've"],
  [/\bshould have\b/gi, "should've"], [/\bmight have\b/gi, "might've"],
];

const formalWords: [RegExp, string][] = [
  [/\bhowever,\s*/gi, "but "], [/\bfurthermore,\s*/gi, "plus, "],
  [/\bin conclusion,\s*/gi, "so, "], [/\badditionally,\s*/gi, "also, "],
  [/\bnevertheless,\s*/gi, "still, "], [/\bconsequently,\s*/gi, "so "],
  [/\bmoreover,\s*/gi, "and "], [/\bnonetheless\b/gi, "still"],
  [/\bthus\b/gi, "so"], [/\bregarding\b/gi, "about"],
  [/\bapproximately\b/gi, "roughly"], [/\bcommence\b/gi, "start"],
  [/\bterminate\b/gi, "end"], [/\butilize\b/gi, "use"],
  [/\butilizing\b/gi, "using"], [/\bsubsequent(ly)?\b/gi, "next"],
  [/\bprior to\b/gi, "before"], [/\bprioritize\b/gi, "focus on"],
  [/\bnumerous\b/gi, "many"], [/\bendeavor\b/gi, "try"],
  [/\bfacilitate\b/gi, "help"], [/\bimplement\b/gi, "set up"],
  [/\bparameters\b/gi, "settings"], [/\bdue to the fact that\b/gi, "because"],
  [/\bin the event that\b/gi, "if"], [/\bin order to\b/gi, "to"],
  [/\bprovide\b/gi, "give"], [/\bprovides\b/gi, "gives"],
  [/\brender\b/gi, "make"], [/\bnecessitate\b/gi, "need"],
  [/\bobtain\b/gi, "get"], [/\bacquire\b/gi, "get"],
  [/\bdemonstrate\b/gi, "show"], [/\bexpedite\b/gi, "speed up"],
  [/\bgenerate\b/gi, "make"], [/\binitiate\b/gi, "start"],
  [/\boptimi[sz]e\b/gi, "improve"], [/\bsufficient\b/gi, "enough"],
  [/\bverify\b/gi, "check"], [/\belaborate\b/gi, "explain"],
];

const aiPhrases: [RegExp, string][] = [
  [/\bas an AI\b/gi, ""], [/\bAs an AI\b/gi, ""],
  [/\bI'm (just )?an AI\b/gi, ""], [/\bI'm an AI\b/gi, ""],
  [/\b(as )?an AI language model\b/gi, ""],
  [/\bI cannot emphasize enough\b/gi, "it's important to note"],
  [/\bI hope this helps\b/gi, "hope this helps"],
  [/\bPlease let me know if you have any (other )?questions\b/gi, "let me know if you need anything else"],
  [/\bIt is important to note that\b/gi, "keep in mind that"],
  [/\bIt should be noted that\b/gi, "you should know that"],
  [/\bas previously mentioned\b/gi, "as I said"],
  [/\bas mentioned earlier\b/gi, "like I said"],
  [/\bin the realm of\b/gi, "in"],
  [/\bwhen it comes to\b/gi, "with"],
  [/\ba wide range of\b/gi, "many"],
  [/\ba plethora of\b/gi, "a lot of"],
  [/\bthe fact that\b/gi, ""],
  [/\bin terms of\b/gi, "for"],
  [/\bit is crucial to\b/gi, "you need to"],
  [/\bit is recommended\b/gi, "you should"],
  [/\blet's dive into\b/gi, "let's look at"],
  [/\bdelve into\b/gi, "explore"],
  [/\bunlock the (full )?potential\b/gi, "make the most"],
  [/\bin today's digital age\b/gi, "these days"],
  [/\bthe landscape of\b/gi, ""],
  [/\bnavigate the\b/gi, "handle"],
  [/\byou can effortlessly\b/gi, "you can easily"],
  [/\bthis means that\b/gi, "so"],
  [/\bin summary\b/gi, "to sum up"],
  [/\bthe aforementioned\b/gi, "this"],
  [/\btherefore\b/gi, "so"], [/\bhence\b/gi, "so"],
  [/\bwhilst\b/gi, "while"],
];

const discourseMarkers = [
  "you know", "actually", "honestly", "basically",
  "the thing is", "to be honest", "I mean", "well",
  "right", "so", "anyway", "truth is",
];

const extremeTransforms: [RegExp, string][] = [
  [/\bIn addition to this\b/gi, "Also,"],
  [/\bIt is also worth mentioning that\b/gi, "Plus,"],
  [/\bOne thing to keep in mind is that\b/gi, "Remember,"],
  [/\bThis is a great question\b/gi, ""],
  [/\bGreat question\b/gi, ""],
  [/\bThat's a great question\b/gi, ""],
  [/\bI appreciate your question\b/gi, ""],
  [/\bLet me break this down\b/gi, "Here's the deal"],
  [/\bLet me explain\b/gi, "So basically"],
  [/\bTo put it simply\b/gi, "Basically"],
  [/\bIn other words\b/gi, "So"],
  [/\bFor example\b/gi, "Like"],
  [/\bFor instance\b/gi, "Like"],
  [/\bOn the other hand\b/gi, "But then again"],
  [/\bAt the end of the day\b/gi, "Ultimately"],
  [/\bIt goes without saying that\b/gi, "Obviously,"],
  [/\bIt is clear that\b/gi, "Obviously,"],
  [/\bNeedless to say\b/gi, "Obviously,"],
  [/\bAs a matter of fact\b/gi, "Actually,"],
  [/\bIn light of this\b/gi, "So"],
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function humanize(text: string, strength: number): { result: string; changes: number; diff: { original: string; humanized: string }[] } {
  let result = text;
  let changes = 0;
  const diff: { original: string; humanized: string }[] = [];

  const applyTransforms = (patterns: [RegExp, string][]) => {
    for (const [pattern, replacement] of patterns) {
      const match = result.match(pattern);
      if (match) {
        const before = match[0];
        result = result.replace(pattern, replacement);
        if (before !== replacement) {
          diff.push({ original: before, humanized: replacement || "(removed)" });
          changes++;
        }
      }
    }
  };

  applyTransforms(aiPhrases);
  applyTransforms(formalWords);

  if (strength >= 1) applyTransforms(contractions);

  if (strength >= 2 && Math.random() < 0.4) {
    const sentences = result.split(/(?<=[.!?])\s+/);
    if (sentences.length > 2) {
      const idx = 1 + Math.floor(Math.random() * (sentences.length - 2));
      const marker = randomItem(discourseMarkers);
      sentences[idx] = `${marker}, ${sentences[idx].toLowerCase()}`;
      diff.push({ original: sentences[idx].replace(`${marker}, `, ""), humanized: `${marker}, ${sentences[idx].toLowerCase()}` });
      changes++;
    }
    result = sentences.join(" ");
  }

  if (strength >= 3 && Math.random() < 0.3) {
    const markers = ["Just ", "So ", "Yeah, "];
    const sentences = result.split(/(?<=[.!?])\s+/);
    if (sentences.length > 1) {
      const idx = Math.floor(Math.random() * (sentences.length - 1)) + 1;
      const filler = randomItem(markers);
      sentences[idx] = filler + sentences[idx].toLowerCase();
      diff.push({ original: sentences[idx].replace(filler, ""), humanized: filler + sentences[idx].toLowerCase() });
      changes++;
    }
    result = sentences.join(" ");
  }

  if (strength >= 4) {
    applyTransforms(extremeTransforms);
    const sentences = result.split(/(?<=[.!?])\s+/);
    for (let i = 0; i < sentences.length; i++) {
      if (Math.random() < 0.15 && sentences[i].length > 40) {
        const mid = Math.floor(sentences[i].length / 2);
        const spaceIdx = sentences[i].indexOf(" ", mid);
        if (spaceIdx > 0) {
          const part1 = sentences[i].slice(0, spaceIdx).trim();
          const part2 = sentences[i].slice(spaceIdx).trim();
          diff.push({ original: sentences[i], humanized: `${part1}. ${part2.charAt(0).toUpperCase()}${part2.slice(1)}` });
          sentences[i] = `${part1}. ${part2.charAt(0).toUpperCase()}${part2.slice(1)}`;
          changes++;
        }
      }
    }
    result = sentences.join(" ");
  }

  return { result: result.trim(), changes, diff };
}

function getStats(text: string) {
  if (!text) return { words: 0, chars: 0, sentences: 0, readingTime: "" };
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const minutes = Math.ceil(words / 200);
  return { words, chars, sentences, readingTime: minutes < 1 ? "<1 min" : `${minutes} min` };
}

export default function AIHumanizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [changes, setChanges] = useState(0);
  const [diff, setDiff] = useState<{ original: string; humanized: string }[]>([]);
  const [strength, setStrength] = useState(2);
  const [view, setView] = useState<"output" | "diff">("output");
  const { track } = useSubscription();

  const inputStats = useMemo(() => getStats(input), [input]);
  const outputStats = useMemo(() => getStats(output), [output]);

  const handleInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    const { result, changes: ch, diff: d } = humanize(val, strength);
    setOutput(result);
    setChanges(ch);
    setDiff(d);
    if (val.trim()) track("ai-humanizer");
  }, [track, strength]);

  const handleStrength = useCallback((val: number) => {
    setStrength(val);
    if (input) {
      const { result, changes: ch, diff: d } = humanize(input, val);
      setOutput(result);
      setChanges(ch);
      setDiff(d);
    }
  }, [input]);

  const handleOutputEdit = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    setOutput(e.currentTarget.innerText);
  }, []);

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolGate toolId="ai-humanizer">
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">AI to Human Text Converter</h1>
      <p className="text-zinc-400 mb-8">
        Paste AI-generated text and make it sound natural and human-like. Uses 60+ transformations.
      </p>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-zinc-300">AI-Generated Text</label>
              <span className="text-xs text-zinc-500">{inputStats.words} words, {inputStats.chars} chars</span>
            </div>
            <textarea
              value={input}
              onChange={handleInput}
              placeholder="Paste AI-generated text here..."
              rows={12}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-zinc-300">Humanized Output</label>
                <div className="flex bg-zinc-800 rounded-lg p-0.5">
                  <button
                    onClick={() => setView("output")}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${view === "output" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-300"}`}
                  >
                    Output
                  </button>
                  <button
                    onClick={() => setView("diff")}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${view === "diff" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-300"}`}
                  >
                    Diff
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {output && (
                  <>
                    <span className="text-xs text-emerald-500">{changes} changes</span>
                    <button onClick={copyOutput} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                      Copy
                    </button>
                  </>
                )}
              </div>
            </div>

            {view === "output" ? (
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={handleOutputEdit}
                className="w-full min-h-[288px] bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-text"
                data-placeholder="Humanized text will appear here..."
              >
                {output || null}
              </div>
            ) : (
              <div className="w-full min-h-[288px] bg-zinc-900 border border-zinc-700 rounded-lg p-4 overflow-y-auto">
                {diff.length > 0 ? (
                  <div className="space-y-2">
                    {diff.map((d, i) => (
                      <div key={i} className="text-sm">
                        <span className="text-red-400 line-through">{d.original}</span>
                        <span className="text-zinc-600 mx-1">→</span>
                        <span className="text-emerald-400">{d.humanized}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-zinc-600 text-sm">No changes detected. Paste some AI text to see the diff.</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-zinc-400">Strength:</span>
          <input
            type="range"
            min={1}
            max={4}
            value={strength}
            onChange={(e) => handleStrength(Number(e.target.value))}
            className="flex-1 max-w-xs accent-emerald-500"
          />
          <div className="flex gap-2">
            {[
              { val: 1, label: "Light" },
              { val: 2, label: "Medium" },
              { val: 3, label: "Aggressive" },
              { val: 4, label: "Extreme" },
            ].map((s) => (
              <button
                key={s.val}
                onClick={() => handleStrength(s.val)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  strength === s.val
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {input && output && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-center">
              <div className="text-xs text-zinc-500 mb-1">Words</div>
              <div className="text-sm font-medium">
                <span className="text-zinc-400">{inputStats.words}</span>
                <span className="text-zinc-600 mx-1">→</span>
                <span className="text-emerald-400">{outputStats.words}</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-center">
              <div className="text-xs text-zinc-500 mb-1">Characters</div>
              <div className="text-sm font-medium">
                <span className="text-zinc-400">{inputStats.chars}</span>
                <span className="text-zinc-600 mx-1">→</span>
                <span className="text-emerald-400">{outputStats.chars}</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-center">
              <div className="text-xs text-zinc-500 mb-1">Sentences</div>
              <div className="text-sm font-medium">
                <span className="text-zinc-400">{inputStats.sentences}</span>
                <span className="text-zinc-600 mx-1">→</span>
                <span className="text-emerald-400">{outputStats.sentences}</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-center">
              <div className="text-xs text-zinc-500 mb-1">Reading Time</div>
              <div className="text-sm font-medium">
                <span className="text-zinc-400">{inputStats.readingTime}</span>
                <span className="text-zinc-600 mx-1">→</span>
                <span className="text-emerald-400">{outputStats.readingTime}</span>
              </div>
            </div>
          </div>
        )}

        {input && output && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">What changed?</h3>
            <ul className="text-xs text-zinc-500 space-y-1 list-disc list-inside">
              <li>Removed AI-specific phrases like &quot;as an AI&quot;, &quot;I cannot emphasize&quot;</li>
              <li>Replaced formal words with casual alternatives</li>
              <li>Added contractions (I am → I&apos;m, cannot → can&apos;t)</li>
              {strength >= 2 && <li>Inserted natural discourse markers</li>}
              {strength >= 3 && <li>Added conversational fillers for a casual tone</li>}
              {strength >= 4 && <li>Restructured sentences and simplified complex phrasing</li>}
            </ul>
          </div>
        )}
      </div>

      <InContentAd />

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">How to Humanize AI Text</h2>
        <div className="space-y-3 text-sm text-zinc-400">
          <p>1. Paste your AI-generated text (from ChatGPT, Gemini, Claude, etc.) into the input box.</p>
          <p>2. Choose a strength level: <strong className="text-zinc-300">Light</strong> for minor tweaks, <strong className="text-zinc-300">Medium</strong> for natural tone, <strong className="text-zinc-300">Aggressive</strong> for major rewrites, <strong className="text-zinc-300">Extreme</strong> for complete transformation.</p>
          <p>3. The output updates in real-time. Click <strong className="text-zinc-300">Diff</strong> to see exactly what changed.</p>
          <p>4. You can edit the output directly in the output box, then copy it.</p>
        </div>
      </div>

      <AdBanner />
      <TipJar />
    </div>
    </ToolGate>
  );
}
