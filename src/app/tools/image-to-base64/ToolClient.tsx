"use client";

import { useState, useRef, type ChangeEvent } from "react";
import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";
import TipJar from "@/components/TipJar";

export default function ImageToBase64Tool() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState(0);
  const previewRef = useRef<HTMLImageElement>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      setDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const copyBase64 = async () => {
    if (!dataUrl) return;
    await navigator.clipboard.writeText(dataUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    if (!dataUrl) return;
    const blob = new Blob([dataUrl], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName.replace(/\.[^.]+$/, "")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Image to Base64 Converter</h1>
      <p className="text-zinc-400 mb-8">
        Convert any image to a Base64 data URL for embedding in HTML, CSS, or JavaScript.
      </p>

      <label className="block w-full border-2 border-dashed border-zinc-700 rounded-xl p-12 text-center cursor-pointer hover:border-emerald-500/50 transition-colors">
        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        <div className="text-zinc-500">
          <svg className="w-10 h-10 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-sm">Click to upload an image</span>
        </div>
      </label>

      {dataUrl && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <img ref={previewRef} src={dataUrl} alt="Preview" className="w-24 h-24 object-contain rounded-lg border border-zinc-800" />
            <div className="text-sm text-zinc-400">
              <p>{fileName}</p>
              <p>{(size / 1024).toFixed(1)} KB</p>
              <p>Base64 length: {dataUrl.length.toLocaleString()} chars</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Base64 Data URL</span>
              <div className="flex gap-2">
                <button
                  onClick={downloadAsTxt}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Download
                </button>
                <button
                  onClick={copyBase64}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={dataUrl}
              rows={6}
              className="w-full bg-transparent text-xs text-zinc-300 font-mono resize-none focus:outline-none"
            />
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-zinc-500">
        <p>All conversion is done locally in your browser. No images are uploaded to any server.</p>
      </div>

      <AdBanner />
      <InContentAd />

      <AdBanner />

      <TipJar />
    </div>
  );
}
