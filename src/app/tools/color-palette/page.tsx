"use client";

import { useState, useRef, type ChangeEvent } from "react";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function rgbToHex({ r, g, b }: RGB): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function getDominantColors(data: Uint8ClampedArray, count: number): RGB[] {
  const colorMap = new Map<string, number>();
  const step = 10;

  for (let i = 0; i < data.length; i += 4 * step) {
    const r = Math.round(data[i] / 16) * 16;
    const g = Math.round(data[i + 1] / 16) * 16;
    const b = Math.round(data[i + 2] / 16) * 16;
    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }

  const sorted = [...colorMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count);

  return sorted.map(([key]) => {
    const [r, g, b] = key.split(",").map(Number);
    return { r, g, b };
  });
}

export default function ColorPalettePage() {
  const [colors, setColors] = useState<RGB[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setImageUrl(url);

      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const maxW = 200;
        const scale = Math.min(maxW / img.width, 1);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setColors(getDominantColors(imageData.data, 6));
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Color Palette from Image</h1>
      <p className="text-zinc-400 mb-8">
        Upload any image and extract its dominant colors instantly.
      </p>

      <label className="block w-full border-2 border-dashed border-zinc-700 rounded-xl p-12 text-center cursor-pointer hover:border-emerald-500/50 transition-colors">
        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        <div className="text-zinc-500">
          <svg className="w-10 h-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Click to upload an image</span>
        </div>
      </label>

      <canvas ref={canvasRef} className="hidden" />

      {imageUrl && (
        <div className="mt-6 flex gap-4 items-start">
          <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-zinc-300 mb-3">Dominant Colors</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((c, i) => {
                const hex = rgbToHex(c);
                return (
                  <button
                    key={i}
                    onClick={() => copyHex(hex)}
                    className="group relative"
                    title="Click to copy"
                  >
                    <div
                      className="w-12 h-12 rounded-lg border border-zinc-700 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {hex}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-zinc-600 mt-6">Click any color to copy its hex code.</p>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-zinc-500">
        <p>All processing is done locally in your browser — no images are uploaded to any server.</p>
      </div>

      <AdBanner />
      <TipJar />
    </div>
  );
}
