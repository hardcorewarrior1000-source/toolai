"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";
import ToolGate from "@/components/ToolGate";
import { useSubscription } from "@/components/SubscriptionProvider";

type Analysis = {
  width: number;
  height: number;
  dominantColors: string[];
  avgBrightness: number;
  isDark: boolean;
  isWarm: boolean;
  contrast: number;
  dominantHue: string;
  saturation: string;
};

function quantizeColor(r: number, g: number, b: number): string {
  const hex = (c: number): string => {
    const v = Math.round(c / 51) * 51;
    return v.toString(16).padStart(2, "0");
  };
  return `#${hex(r)}${hex(g)}${hex(b)}`.toUpperCase();
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function getHueName(hue: number): string {
  if (hue < 30) return "Red";
  if (hue < 60) return "Orange";
  if (hue < 90) return "Yellow";
  if (hue < 150) return "Green";
  if (hue < 210) return "Cyan";
  if (hue < 270) return "Blue";
  if (hue < 330) return "Purple";
  return "Red";
}

function analyzeImage(file: File): Promise<Analysis> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const totalPixels = data.length / 4;

      // Sample every 10th pixel for color analysis
      const colorCounts = new Map<string, number>();
      let totalBrightness = 0;
      let totalSaturation = 0;
      let warmPixels = 0;
      let coolPixels = 0;
      let darkPixels = 0;
      let lightPixels = 0;

      for (let i = 0; i < data.length; i += 40) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        totalBrightness += brightness;

        if (brightness < 85) darkPixels++;
        else if (brightness > 170) lightPixels++;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        totalSaturation += sat;

        // Warm: red/orange/yellow dominant
        if (r > b && r > 100) warmPixels++;
        else coolPixels++;

        const q = quantizeColor(r, g, b);
        colorCounts.set(q, (colorCounts.get(q) || 0) + 1);
      }

      const sampled = data.length / 40;
      const avgBrightness = totalBrightness / sampled;

      // Get top 5 dominant colors
      const sorted = [...colorCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      const dominantColors = sorted.map(([hex]) => hex);

      // Compute dominant hue via histogram across sampled pixels
      const hueCounts = new Map<number, number>();
      for (let i = 0; i < data.length; i += 40) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        if (max === min) continue;
        const d = max - min;
        let h = 0;
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        else if (max === g) h = ((b - r) / d + 2) * 60;
        else h = ((r - g) / d + 4) * 60;
        const bucket = Math.round(h / 30) * 30;
        hueCounts.set(bucket, (hueCounts.get(bucket) || 0) + 1);
      }
      const dominantBucket = [...hueCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 0;
      const hue = dominantBucket + 15;

      const avgSat = totalSaturation / sampled;
      const total = warmPixels + coolPixels;

      resolve({
        width: canvas.width,
        height: canvas.height,
        dominantColors,
        avgBrightness,
        isDark: avgBrightness < 100,
        isWarm: warmPixels > coolPixels,
        contrast: lightPixels / Math.max(darkPixels, 1),
        dominantHue: getHueName(hue),
        saturation: avgSat > 0.5 ? "Vibrant" : avgSat > 0.2 ? "Moderate" : "Muted",
      });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

const styles = [
  "Photorealistic",
  "Cinematic",
  "3D Render",
  "Oil Painting",
  "Watercolor",
  "Digital Art",
  "Anime",
  "Pixel Art",
  "Sketch",
  "Minimalist",
  "Cyberpunk",
  "Fantasy Art",
];

const moods = [
  "Moody & Dark",
  "Bright & Cheerful",
  "Serene & Calm",
  "Dramatic",
  "Mysterious",
  "Warm & Cozy",
  "Cold & Sterile",
  "Nostalgic",
  "Energetic",
  "Dreamy",
];

function generatePrompt(analysis: Analysis, style: string, mood: string): string {
  const aspect = analysis.width / analysis.height;
  const aspectLabel =
    aspect > 1.7 ? "wide landscape" : aspect > 1.2 ? "landscape" : aspect > 0.8 ? "square" : "portrait";

  const colorWords = analysis.dominantColors.slice(0, 3).join(", ");
  const temp = analysis.isWarm ? "warm" : "cool";
  const lightDesc = analysis.isDark ? "dimly lit, low-key lighting" : "well-lit, bright";
  const contrastDesc = analysis.contrast > 3 ? "high contrast" : "soft contrast";

  return [
    `A ${aspectLabel} composition with a ${temp} color palette dominated by ${colorWords}.`,
    `The image has a ${mood.toLowerCase()} atmosphere, rendered in a ${style.toLowerCase()} style.`,
    `The scene is ${lightDesc} with ${contrastDesc} lighting.`,
    `Colors are ${analysis.saturation.toLowerCase()} with a ${analysis.dominantHue.toLowerCase()} hue bias.`,
    `Overall tone is ${analysis.avgBrightness < 85 ? "dark and shadowy" : analysis.avgBrightness > 170 ? "bright and airy" : "balanced mid-tone"}.`,
  ].join(" ");
}

export default function ImageToPromptPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [mood, setMood] = useState(moods[0]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { track } = useSubscription();

  const handleFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setLoading(true);
    try {
      const result = await analyzeImage(f);
      setAnalysis(result);
      const initialStyle = styles[0];
      const initialMood = moods[0];
      setPrompt(generatePrompt(result, initialStyle, initialMood));
      track("image-to-prompt");
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!analysis) return;
    setPrompt(generatePrompt(analysis, style, mood));
  }, [style, mood, analysis]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolGate toolId="image-to-prompt">
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Image to Prompt Generator</h1>
      <p className="text-zinc-400 mb-8">
        Upload any image and get a detailed AI prompt you can use with Midjourney, DALL-E, Stable Diffusion, and more.
      </p>

      <div className="grid gap-6">
        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
          ) : (
            <div className="py-8">
              <p className="text-zinc-500 text-lg mb-2">Click to upload an image</p>
              <p className="text-zinc-600 text-sm">PNG, JPG, WebP — any image you want to describe</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>

        {loading && (
          <div className="text-center text-zinc-400 py-4">Analyzing image...</div>
        )}

        {analysis && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {analysis.dominantColors.map((color, i) => (
                <div key={i} className="flex items-center gap-2 bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                  <div className="w-8 h-8 rounded-md border border-zinc-700" style={{ backgroundColor: color }} />
                  <span className="text-xs text-zinc-400 font-mono">{color}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                <span className="text-zinc-500 block text-xs">Size</span>
                <span className="text-zinc-300">{analysis.width} × {analysis.height}</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                <span className="text-zinc-500 block text-xs">Hue</span>
                <span className="text-zinc-300">{analysis.dominantHue}</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                <span className="text-zinc-500 block text-xs">Temp</span>
                <span className="text-zinc-300">{analysis.isWarm ? "Warm" : "Cool"}</span>
              </div>
              <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                <span className="text-zinc-500 block text-xs">Saturation</span>
                <span className="text-zinc-300">{analysis.saturation}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-2">Art Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {styles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-2">Mood / Atmosphere</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {moods.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-zinc-300">Generated Prompt</label>
                <button
                  onClick={copyPrompt}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="w-full min-h-[100px] bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 text-sm whitespace-pre-wrap">
                {prompt}
              </div>
            </div>
          </>
        )}
      </div>

      <AdBanner />
      <TipJar />
    </div>
    </ToolGate>
  );
}
