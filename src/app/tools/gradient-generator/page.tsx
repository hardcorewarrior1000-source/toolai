"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";
import TipJar from "@/components/TipJar";

interface ColorStop {
  color: string;
  position: number;
}

const defaultStops: ColorStop[] = [
  { color: "#10b981", position: 0 },
  { color: "#3b82f6", position: 100 },
];

export default function GradientGeneratorPage() {
  const [stops, setStops] = useState<ColorStop[]>(defaultStops);
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const updateStop = (i: number, updates: Partial<ColorStop>) => {
    setStops((prev) => prev.map((s, j) => (j === i ? { ...s, ...updates } : s)));
  };

  const addStop = () => {
    setStops((prev) => [...prev, { color: "#ffffff", position: 50 }]);
  };

  const removeStop = (i: number) => {
    if (stops.length > 2) {
      setStops((prev) => prev.filter((_, j) => j !== i));
    }
  };

  const gradientCSS = `linear-gradient(${angle}deg, ${stops
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ")})`;

  const copyCSS = async () => {
    await navigator.clipboard.writeText(`background: ${gradientCSS};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">CSS Gradient Generator</h1>
      <p className="text-zinc-400 mb-8">
        Create beautiful CSS gradients with a visual editor. Copy the code and use it anywhere.
      </p>

      <div
        className="h-48 rounded-xl mb-6"
        style={{ background: gradientCSS }}
      />

      <div className="space-y-4 mb-6">
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(i, { color: e.target.value })}
              className="w-10 h-10 rounded border border-zinc-700 bg-transparent cursor-pointer"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={stop.position}
              onChange={(e) => updateStop(i, { position: Number(e.target.value) })}
              className="flex-1 accent-emerald-500"
            />
            <span className="text-xs text-zinc-500 w-10 text-right">{stop.position}%</span>
            {stops.length > 2 && (
              <button onClick={() => removeStop(i)} className="text-zinc-600 hover:text-red-400 text-sm">
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {stops.length < 5 && (
        <button
          onClick={addStop}
          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors mb-6"
        >
          + Add color stop
        </button>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Angle: {angle}°</label>
        <input
          type="range"
          min={0}
          max={360}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400">CSS</span>
          <button
            onClick={copyCSS}
            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <code className="text-sm text-zinc-300 break-all">background: {gradientCSS};</code>
      </div>

      <div className="mt-6 text-sm text-zinc-500">
        <p>Click Copy to use the CSS in your projects.</p>
      </div>

      <AdBanner />
      <InContentAd />

      <AdBanner />

      <TipJar />
    </div>
  );
}
