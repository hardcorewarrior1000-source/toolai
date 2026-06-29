"use client";

import { useState, useCallback } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) {
      setPassword("Select at least one character type");
      return;
    }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => chars[v % chars.length]).join(""));
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = (() => {
    const pool =
      (uppercase ? 26 : 0) + (lowercase ? 26 : 0) + (numbers ? 10 : 0) + (symbols ? 26 : 0);
    const bits = length * Math.log2(pool || 1);
    if (bits < 40) return { label: "Weak", color: "text-red-400" };
    if (bits < 60) return { label: "Fair", color: "text-yellow-400" };
    if (bits < 80) return { label: "Strong", color: "text-emerald-400" };
    return { label: "Very Strong", color: "text-emerald-300" };
  })();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Password Generator</h1>
      <p className="text-zinc-400 mb-8">Generate secure, random passwords with customizable options. All passwords are generated locally in your browser.</p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
        <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4 flex items-center gap-3">
          <code className="flex-1 text-emerald-400 font-mono text-lg break-all">{password || "Click Generate"}</code>
          {password && (
            <button onClick={copy} className="shrink-0 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-300 rounded-lg transition-colors">
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>

        {password && !password.startsWith("Select") && (
          <p className={`text-sm font-semibold ${strength.color}`}>Strength: {strength.label}</p>
        )}

        <div>
          <label className="text-sm text-zinc-400 mb-2 block">Length: {length}</label>
          <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full accent-emerald-400" />
          <div className="flex justify-between text-xs text-zinc-600 mt-1"><span>8</span><span>64</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Uppercase (A-Z)", checked: uppercase, set: setUppercase },
            { label: "Lowercase (a-z)", checked: lowercase, set: setLowercase },
            { label: "Numbers (0-9)", checked: numbers, set: setNumbers },
            { label: "Symbols (!@#$)", checked: symbols, set: setSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
              <input type="checkbox" checked={opt.checked} onChange={(e) => opt.set(e.target.checked)} className="accent-emerald-400" />
              {opt.label}
            </label>
          ))}
        </div>

        <button onClick={generate} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-colors">
          Generate Password
        </button>
      </div>

      <div className="mt-8 text-zinc-500 text-sm space-y-2">
        <p><strong className="text-zinc-300">Cryptographically secure:</strong> Uses the Web Crypto API (crypto.getRandomValues) for true randomness.</p>
        <p><strong className="text-zinc-300">Local processing:</strong> Passwords are generated entirely in your browser. Nothing is sent to any server.</p>
      </div>
    </div>
  );
}
