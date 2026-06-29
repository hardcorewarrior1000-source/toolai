"use client";

import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const format = (indent: number) => {
    setError("");
    setOutput("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const minify = () => {
    setError("");
    setOutput("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const validate = () => {
    setError("");
    setOutput("");
    try {
      JSON.parse(input);
      setError("Valid JSON");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = input.split("\n").length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">JSON Formatter</h1>
      <p className="text-zinc-400 mb-8">Format, validate, and minify JSON data instantly. Everything runs locally in your browser.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Input{lines > 1 ? ` (${lines} lines)` : ""}</span>
            <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); }}
            placeholder='{"key": "value", "numbers": [1, 2, 3]}'
            className="w-full h-96 bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-300 placeholder-zinc-700 resize-none focus:outline-none focus:border-emerald-500/50"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Output</span>
            {(output || error) && (
              <button onClick={copy} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="w-full h-96 bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-auto">
            {error ? (
              <p className={`text-sm font-mono ${error === "Valid JSON" ? "text-emerald-400" : "text-red-400"}`}>{error}</p>
            ) : output ? (
              <pre className="text-sm font-mono text-zinc-300 whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-sm text-zinc-700">Formatted output will appear here</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => format(2)} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors text-sm">
          Format (2 spaces)
        </button>
        <button onClick={() => format(4)} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors text-sm">
          Format (4 spaces)
        </button>
        <button onClick={minify} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-lg transition-colors text-sm">
          Minify
        </button>
        <button onClick={validate} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-lg transition-colors text-sm">
          Validate
        </button>
      </div>
    </div>
  );
}
