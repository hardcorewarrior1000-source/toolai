"use client";

import { useState, type ChangeEvent, useCallback } from "react";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";
import ToolGate from "@/components/ToolGate";
import { useSubscription } from "@/components/SubscriptionProvider";

const contractions: [RegExp, string][] = [
  [/\bI am\b/gi, "I'm"],
  [/\byou are\b/gi, "you're"],
  [/\bthey are\b/gi, "they're"],
  [/\bwe are\b/gi, "we're"],
  [/\bit is\b/gi, "it's"],
  [/\bthat is\b/gi, "that's"],
  [/\bwhat is\b/gi, "what's"],
  [/\bthere is\b/gi, "there's"],
  [/\bhere is\b/gi, "here's"],
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
  [/\bmust not\b/gi, "mustn't"],
  [/\bneed not\b/gi, "needn't"],
  [/\bcould have\b/gi, "could've"],
  [/\bwould have\b/gi, "would've"],
  [/\bshould have\b/gi, "should've"],
  [/\bmight have\b/gi, "might've"],
  [/\bmust have\b/gi, "must've"],
];

const formalWords: [RegExp, string][] = [
  [/\bhowever,\s*/gi, "but "],
  [/\bfurthermore,\s*/gi, "plus, "],
  [/\bin conclusion,\s*/gi, "so, "],
  [/\badditionally,\s*/gi, "also, "],
  [/\bnevertheless,\s*/gi, "still, "],
  [/\bconsequently,\s*/gi, "so "],
  [/\bmoreover,\s*/gi, "and "],
  [/\bnonetheless\b/gi, "still"],
  [/\bthus\b/gi, "so"],
  [/\bregarding\b/gi, "about"],
  [/\bapproximately\b/gi, "roughly"],
  [/\bcommence\b/gi, "start"],
  [/\bterminate\b/gi, "end"],
  [/\butilize\b/gi, "use"],
  [/\butilizing\b/gi, "using"],
  [/\butilization\b/gi, "use"],
  [/\bsubsequent(ly)?\b/gi, "next"],
  [/\bprior to\b/gi, "before"],
  [/\bprioritize\b/gi, "focus on"],
  [/\bnumerous\b/gi, "many"],
  [/\bendeavor\b/gi, "try"],
  [/\bfacilitate\b/gi, "help"],
  [/\bfacilitating\b/gi, "helping"],
  [/\bfacilitated\b/gi, "helped"],
  [/\bimplement\b/gi, "set up"],
  [/\bimplementation\b/gi, "setup"],
  [/\bparameters\b/gi, "settings"],
  [/\bdue to the fact that\b/gi, "because"],
  [/\bin the event that\b/gi, "if"],
  [/\bwith the exception of\b/gi, "except for"],
  [/\bin order to\b/gi, "to"],
  [/\bprovide\b/gi, "give"],
  [/\bprovides\b/gi, "gives"],
  [/\bprovided\b/gi, "gave"],
  [/\brender\b/gi, "make"],
  [/\brenders\b/gi, "makes"],
  [/\bnecessitate\b/gi, "need"],
  [/\bnecessitates\b/gi, "needs"],
  [/\bobtain\b/gi, "get"],
  [/\bobtains\b/gi, "gets"],
  [/\bobtained\b/gi, "got"],
  [/\bacquire\b/gi, "get"],
  [/\bacquires\b/gi, "gets"],
  [/\bacquired\b/gi, "got"],
  [/\bdemonstrate\b/gi, "show"],
  [/\bdemonstrates\b/gi, "shows"],
  [/\bdemonstrated\b/gi, "showed"],
  [/\bconstructed?\b/gi, "built"],
  [/\belaborate\b/gi, "detailed"],
  [/\belaborated?\b/gi, "explain"],
  [/\bencounter\b/gi, "face"],
  [/\bencounters\b/gi, "faces"],
  [/\bencountered\b/gi, "faced"],
  [/\bestablish\b/gi, "set up"],
  [/\bestablishes\b/gi, "sets up"],
  [/\bestablished\b/gi, "set up"],
  [/\bexpedite\b/gi, "speed up"],
  [/\bexpedites\b/gi, "speeds up"],
  [/\bexpedited\b/gi, "sped up"],
  [/\bgenerate\b/gi, "make"],
  [/\bgenerates\b/gi, "makes"],
  [/\bgenerated\b/gi, "made"],
  [/\binitiate\b/gi, "start"],
  [/\binitiates\b/gi, "starts"],
  [/\binitiated\b/gi, "started"],
  [/\boptimi[sz]e\b/gi, "improve"],
  [/\boptimi[sz]ation\b/gi, "improvement"],
  [/\bparticular(ly)?\b/gi, "especially"],
  [/\bsufficient\b/gi, "enough"],
  [/\bsufficiently\b/gi, "enough"],
  [/\butilize\b/gi, "use"],
  [/\bverify\b/gi, "check"],
  [/\bverifies\b/gi, "checks"],
  [/\bverified\b/gi, "checked"],
];

const aiPhrases: [RegExp, string][] = [
  [/\bas an AI\b/gi, "as a machine learning model"],
  [/\bAs an AI\b/gi, "As someone who processes text"],
  [/\bI'm (just )?an AI\b/gi, "I'm a language model"],
  [/\bI'm an AI\b/gi, "I'm"],
  [/\b(as )?an AI language model\b/gi, ""],
  [/\bI cannot emphasize enough\b/gi, "it's important to note"],
  [/\bI hope this helps\b/gi, "hope this helps"],
  [/\bPlease let me know if you have any (other )?questions\b/gi, "let me know if you need anything else"],
  [/\bFeel free to\b/gi, "feel free to"],
  [/\bIt's worth noting that\b/gi, "it's worth noting that"],
  [/\bIt is important to note that\b/gi, "keep in mind that"],
  [/\bIt should be noted that\b/gi, "you should know that"],
  [/\bas previously mentioned\b/gi, "as I said"],
  [/\bas mentioned earlier\b/gi, "like I said"],
  [/\bin the realm of\b/gi, "in"],
  [/\bwhen it comes to\b/gi, "with"],
  [/\ba wide range of\b/gi, "many"],
  [/\ba plethora of\b/gi, "a lot of"],
  [/\ba variety of\b/gi, "different"],
  [/\bthe fact that\b/gi, ""],
  [/\bin terms of\b/gi, "for"],
  [/\bwith regard to\b/gi, "about"],
  [/\bin regards to\b/gi, "about"],
  [/\bin relation to\b/gi, "about"],
  [/\bNot only.*but also\b/gi, ""],
  [/\bit is crucial to\b/gi, "you need to"],
  [/\bIt is essential\b/gi, "you should"],
  [/\bit is recommended\b/gi, "you should"],
  [/\bwe recommend\b/gi, "we suggest"],
  [/\bI would recommend\b/gi, "I suggest"],
  [/\bIt is advisable\b/gi, "you should"],
  [/\blet's dive into\b/gi, "let's look at"],
  [/\bdelve into\b/gi, "explore"],
  [/\bdelve deeper\b/gi, "explore more"],
  [/\bunlock the (full )?potential\b/gi, "make the most"],
  [/\bin today's digital age\b/gi, "these days"],
  [/\bin today's fast-paced\b/gi, "in today's"],
  [/\bthe landscape of\b/gi, ""],
  [/\bnavigate the\b/gi, "handle"],
  [/\byou can effortlessly\b/gi, "you can easily"],
  [/\bthis means that\b/gi, "so"],
  [/\bin summary\b/gi, "to sum up"],
  [/\bto summarise\b/gi, "to sum up"],
  [/\bto summarize\b/gi, "to sum up"],
  [/\ball in all\b/gi, "overall"],
  [/\bin the following sections?\b/gi, "next"],
  [/\bas follows\b/gi, "like this"],
  [/\bthe aforementioned\b/gi, "this"],
  [/\babovementioned\b/gi, "above"],
  [/\bhereby\b/gi, ""],
  [/\bherewith\b/gi, ""],
  [/\btherefore\b/gi, "so"],
  [/\bhence\b/gi, "so"],
  [/\bwherein\b/gi, "where"],
  [/\bwherein\b/gi, "where"],
  [/\bwhilst\b/gi, "while"],
  [/\bamongst\b/gi, "among"],
];

const discourseMarkers = [
  "you know",
  "actually",
  "honestly",
  "basically",
  "the thing is",
  "to be honest",
  "I mean",
  "well",
  "right",
  "so",
  "anyway",
  "at the end of the day",
  "in reality",
  "truth is",
  "if I'm being honest",
  "come to think of it",
  "now that I think about it",
  "in a nutshell",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function humanize(text: string, strength: number): { result: string; changes: number } {
  let result = text;
  let changes = 0;

  // Apply AI phrase removals
  for (const [pattern, replacement] of aiPhrases) {
    const match = result.match(pattern);
    if (match) {
      result = result.replace(pattern, replacement);
      changes++;
    }
  }

  // Apply formal word replacements
  for (const [pattern, replacement] of formalWords) {
    const match = result.match(pattern);
    if (match) {
      result = result.replace(pattern, replacement);
      changes++;
    }
  }

  // Apply contractions
  if (strength >= 1) {
    for (const [pattern, replacement] of contractions) {
      const match = result.match(pattern);
      if (match) {
        result = result.replace(pattern, replacement);
        changes++;
      }
    }
  }

  // Add discourse markers at sentence starts (strength >= 2)
  if (strength >= 2 && Math.random() < 0.4) {
    const sentences = result.split(/(?<=[.!?])\s+/);
    if (sentences.length > 2) {
      const idx = 1 + Math.floor(Math.random() * (sentences.length - 2));
      if (Math.random() < 0.5) {
        sentences[idx] = `${randomItem(discourseMarkers)}, ${sentences[idx].toLowerCase()}`;
        changes++;
      }
    }
    result = sentences.join(" ");
  }

  // Add filler at sentence beginnings (strength >= 3)
  if (strength >= 3 && Math.random() < 0.3) {
    const markers = ["Just ", "So ", "Yeah, ", "Oh, "];
    const sentences = result.split(/(?<=[.!?])\s+/);
    if (sentences.length > 1) {
      const idx = Math.floor(Math.random() * (sentences.length - 1)) + 1;
      sentences[idx] = randomItem(markers) + sentences[idx].toLowerCase();
      changes++;
    }
    result = sentences.join(" ");
  }

  return { result: result.trim(), changes };
}

export default function AIHumanizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [changes, setChanges] = useState(0);
  const [strength, setStrength] = useState(2);
  const { track } = useSubscription();

  const handleInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    const { result, changes: ch } = humanize(val, 2);
    setOutput(result);
    setChanges(ch);
    if (val.trim()) track("ai-humanizer");
  }, [track]);

  const handleStrength = useCallback((val: number) => {
    setStrength(val);
    if (input) {
      const { result, changes: ch } = humanize(input, val);
      setOutput(result);
      setChanges(ch);
    }
  }, [input]);

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolGate toolId="ai-humanizer">
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">AI to Human Text Converter</h1>
      <p className="text-zinc-400 mb-8">
        Paste AI-generated text and make it sound natural and human-like. Uses 60+ transformations.
      </p>

      <div className="grid gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-300">AI-Generated Text</label>
            <span className="text-xs text-zinc-500">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={handleInput}
            placeholder="Paste AI-generated text here..."
            rows={8}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">Strength:</span>
          <input
            type="range"
            min={1}
            max={3}
            value={strength}
            onChange={(e) => handleStrength(Number(e.target.value))}
            className="flex-1 max-w-xs accent-emerald-500"
          />
          <span className="text-xs text-zinc-500">
            {strength === 1 ? "Light" : strength === 2 ? "Medium" : "Aggressive"}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-zinc-300">Humanized Output</label>
            <div className="flex items-center gap-3">
              {output && (
                <>
                  <span className="text-xs text-emerald-500">{changes} changes made</span>
                  <button
                    onClick={copyOutput}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Copy
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-full min-h-[120px] bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 whitespace-pre-wrap">
            {output || <span className="text-zinc-600">Humanized text will appear here...</span>}
          </div>
        </div>

        {input && output && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">What changed?</h3>
            <ul className="text-xs text-zinc-500 space-y-1 list-disc list-inside">
              <li>Removed AI-specific phrases like &quot;as an AI&quot;, &quot;I cannot emphasize&quot;</li>
              <li>Replaced formal words with casual alternatives</li>
              <li>Added contractions (I am → I&apos;m, cannot → can&apos;t)</li>
              {strength >= 2 && <li>Inserted natural discourse markers</li>}
              {strength >= 3 && <li>Added conversational fillers for a casual tone</li>}
            </ul>
          </div>
        )}
      </div>

      <AdBanner />
      <TipJar />
    </div>
    </ToolGate>
  );
}
