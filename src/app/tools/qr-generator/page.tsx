"use client";

import { useState, useEffect, useRef, type ChangeEvent } from "react";
import QRCode from "qrcode";
import AdBanner from "@/components/AdBanner";
import TipJar from "@/components/TipJar";
import ToolGate from "@/components/ToolGate";
import { useSubscription } from "@/components/SubscriptionProvider";

export default function QRGeneratorPage() {
  const [text, setText] = useState("");
  const [errorLevel, setErrorLevel] = useState<string>("M");
  const [size, setSize] = useState(300);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { track } = useSubscription();

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (!text.trim()) {
      setDataUrl(null);
      return;
    }

    QRCode.toDataURL(
      text.trim(),
      {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorLevel as "L" | "M" | "Q" | "H",
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      },
      (err, url) => {
        if (!err) {
          setDataUrl(url);
          track("qr-generator");
        }
      }
    );
  }, [text, errorLevel, size]);

  const downloadPNG = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <ToolGate toolId="qr-generator">
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">QR Code Generator</h1>
      <p className="text-zinc-400 mb-8">
        Generate scannable QR codes from any text or URL. Industry-standard encoding with error correction.
      </p>

      <input
        type="text"
        value={text}
        onChange={handleText}
        placeholder="Enter text or URL..."
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6"
      />

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <span>Error correction:</span>
          <select
            value={errorLevel}
            onChange={(e) => setErrorLevel(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <span>Size:</span>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="200">200px</option>
            <option value="300">300px</option>
            <option value="400">400px</option>
            <option value="500">500px</option>
          </select>
        </label>
      </div>

      {dataUrl && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-xl inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="QR Code" width={size} height={size} className="block" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={downloadPNG}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
          >
            Download PNG
          </button>
        </div>
      )}

      {!text.trim() && (
        <div className="text-center py-16 text-zinc-600">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <p className="text-sm">Enter text or a URL above to generate a scannable QR code.</p>
        </div>
      )}

      <AdBanner />
      <TipJar />
    </div>
    </ToolGate>
  );
}
