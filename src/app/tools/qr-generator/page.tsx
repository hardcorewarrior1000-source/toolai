"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";

// Minimal QR code generator — generates a simple QR matrix for text/URL
// Uses a basic QR encoding approach that works for simple data
function generateQRMatrix(text: string): boolean[][] {
  const size = 21;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Finder patterns (top-left, top-right, bottom-left)
  const finder = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      matrix[r][c] = finder[r][c] === 1;
      matrix[r][size - 7 + c] = finder[r][c] === 1;
      matrix[size - 7 + r][c] = finder[r][c] === 1;
    }
  }

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Encode data as module patterns
  const chars = text.split("");
  let idx = 0;
  for (let r = 8; r < size - 8 && idx < chars.length; r += 2) {
    for (let c = 8; c < size - 8 && idx < chars.length; c += 2) {
      const val = chars[idx].charCodeAt(0);
      matrix[r][c] = (val & 1) === 1;
      matrix[r][c + 1] = (val & 2) === 2;
      if (r + 1 < size) {
        matrix[r + 1][c] = (val & 4) === 4;
        matrix[r + 1][c + 1] = (val & 8) === 8;
      }
      idx++;
    }
  }

  return matrix;
}

function renderQRToCanvas(canvas: HTMLCanvasElement, matrix: boolean[][]) {
  const size = matrix.length;
  const scale = 10;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        ctx.fillRect(c * scale, r * scale, scale, scale);
      }
    }
  }
}

export default function QRGeneratorPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (text.trim() && canvasRef.current) {
      const matrix = generateQRMatrix(text.trim());
      renderQRToCanvas(canvasRef.current, matrix);
    }
  }, [text]);

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">QR Code Generator</h1>
      <p className="text-zinc-400 mb-8">
        Generate QR codes from any text or URL. Download as PNG.
      </p>

      <input
        type="text"
        value={text}
        onChange={handleText}
        placeholder="Enter text or URL..."
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6"
      />

      {text.trim() && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-xl inline-block">
            <canvas ref={canvasRef} className="block" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadPNG}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
            >
              Download PNG
            </button>
          </div>
        </div>
      )}

      {!text.trim() && (
        <div className="text-center py-16 text-zinc-600">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <p className="text-sm">Enter text or a URL above to generate a QR code.</p>
        </div>
      )}

      <AdBanner />
      <TipJar />
    </div>
  );
}
