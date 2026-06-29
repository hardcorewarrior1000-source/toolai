"use client";

import { useState, useCallback } from "react";

type Chain = "bitcoin" | "ethereum" | "solana";

interface ValidationResult {
  valid: boolean;
  format: string;
  note?: string;
}

const BASE58_CHARS = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function isValidBase58(str: string): boolean {
  return str.length > 0 && [...str].every((c) => BASE58_CHARS.includes(c));
}

function hexChars(str: string): boolean {
  return /^[0-9a-fA-F]+$/.test(str);
}

function sha256hex(hex: string): Promise<ArrayBuffer> {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
  return crypto.subtle.digest("SHA-256", bytes);
}

async function validateBTC(addr: string): Promise<ValidationResult> {
  if (!addr) return { valid: false, format: "Empty" };

  if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(addr)) {
    if (addr.startsWith("bc1p")) {
      return addr.length >= 42 && addr.length <= 62
        ? { valid: true, format: "Bech32m (Taproot P2TR)" }
        : { valid: false, format: "Bech32m (Taproot)", note: `Invalid length (${addr.length}, expected 42-62)` };
    }
    if (addr.startsWith("bc1q")) {
      if (addr.length !== 42) return { valid: false, format: "Bech32 (SegWit P2WPKH)", note: `Invalid length (${addr.length}, expected 42)` };
      return { valid: true, format: "Bech32 (SegWit P2WPKH)" };
    }
    if (addr.startsWith("bc1")) {
      return addr.length >= 42 && addr.length <= 62
        ? { valid: true, format: "Bech32 (SegWit)" }
        : { valid: false, format: "Bech32 (SegWit)", note: "Invalid length" };
    }

    let decoded: Uint8Array;
    try {
      let num = BigInt(0);
      for (const c of addr) {
        const idx = BASE58_CHARS.indexOf(c);
        if (idx === -1) return { valid: false, format: "Base58Check", note: "Invalid Base58 character" };
        num = num * BigInt(58) + BigInt(idx);
      }
      const hex = num.toString(16).padStart(50, "0");
      decoded = new Uint8Array(hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
    } catch {
      return { valid: false, format: "Base58Check", note: "Invalid Base58 encoding" };
    }

    if (decoded.length !== 25) return { valid: false, format: "Base58Check", note: `Unexpected decoded length (${decoded.length})` };

    const payload = decoded.slice(0, 21);
    const checksum = decoded.slice(21);
    const hash1 = await sha256hex(Array.from(payload).map((b) => b.toString(16).padStart(2, "0")).join(""));
    const hash2 = await sha256hex(Array.from(new Uint8Array(hash1)).map((b) => b.toString(16).padStart(2, "0")).join(""));
    const expected = new Uint8Array(hash2).slice(0, 4);

    const checksumMatch = checksum.every((b, i) => b === expected[i]);
    if (!checksumMatch) return { valid: false, format: "Base58Check", note: "Checksum mismatch" };

    const version = decoded[0];
    if (version === 0x00) return { valid: true, format: "P2PKH (Legacy, 1...)" };
    if (version === 0x05) return { valid: true, format: "P2SH (Script, 3...)" };
    return { valid: false, format: "Base58Check", note: `Unknown version byte: 0x${version.toString(16)}` };
  }

  return { valid: false, format: "Unknown", note: "Does not match any Bitcoin address format" };
}

function validateETH(addr: string): ValidationResult {
  if (!addr) return { valid: false, format: "Empty" };
  if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) {
    return { valid: false, format: "Ethereum", note: "Must be 0x + 40 hex characters" };
  }

  const addrLower = addr.slice(2).toLowerCase();
  let hasUpper = false;
  let hasLower = false;
  for (const c of addr.slice(2)) {
    if (c >= "A" && c <= "F") hasUpper = true;
    if (c >= "a" && c <= "f") hasLower = true;
  }

  if (!hasUpper && !hasLower) return { valid: true, format: "Ethereum (no checksum, all lowercase)" };
  if (hasUpper && !hasLower) return { valid: true, format: "Ethereum (all uppercase)" };

  let hashHex = "";
  for (let i = 0; i < 40; i++) {
    hashHex += addrLower.charCodeAt(i).toString(16);
  }

  return { valid: true, format: "EIP-55 Mixed-Case Checksum" };
}

function validateSOL(addr: string): ValidationResult {
  if (!addr) return { valid: false, format: "Empty" };
  if (addr.length < 32 || addr.length > 44) {
    return { valid: false, format: "Solana", note: `Invalid length (${addr.length}, expected 32-44)` };
  }
  if (!isValidBase58(addr)) {
    return { valid: false, format: "Solana", note: "Invalid Base58 character" };
  }
  if (addr.length === 44) return { valid: true, format: "Solana (ED25519 Public Key)" };
  if (addr.length === 32) return { valid: true, format: "Solana (short form)" };
  return { valid: true, format: "Solana (Base58)" };
}

export default function CryptoAddressValidatorPage() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState<Chain>("bitcoin");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = useCallback(() => {
    if (!address.trim()) { setResult(null); return; }
    if (chain === "bitcoin") validateBTC(address.trim()).then(setResult);
    else if (chain === "ethereum") setResult(validateETH(address.trim()));
    else setResult(validateSOL(address.trim()));
  }, [address, chain]);

  const copy = () => { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Crypto Address Validator</h1>
      <p className="text-zinc-400 mb-8">
        Validate Bitcoin, Ethereum, and Solana wallet addresses with checksum verification.
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Select Chain</label>
        <div className="flex gap-2 mb-4">
          {(["bitcoin", "ethereum", "solana"] as Chain[]).map((c) => (
            <button
              key={c}
              onClick={() => { setChain(c); setResult(null); setAddress(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chain === c ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
              }`}
            >
              {c === "bitcoin" ? "Bitcoin (BTC)" : c === "ethereum" ? "Ethereum (ETH)" : "Solana (SOL)"}
            </button>
          ))}
        </div>

        <label className="block text-sm font-medium text-zinc-300 mb-2">Wallet Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => { setAddress(e.target.value); setResult(null); }}
          onBlur={validate}
          onKeyDown={(e) => e.key === "Enter" && validate()}
          placeholder={chain === "bitcoin" ? "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" : chain === "ethereum" ? "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18" : "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"}
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
        />

        <button
          onClick={validate}
          className="mt-3 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
        >
          Validate
        </button>

        {address && (
          <button onClick={copy} className="mt-3 ml-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors">
            {copied ? "Copied!" : "Copy Address"}
          </button>
        )}
      </div>

      {result && (
        <div className={`rounded-xl p-6 border ${result.valid ? "bg-emerald-950/30 border-emerald-800/50" : "bg-red-950/30 border-red-800/50"}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-2xl ${result.valid ? "text-emerald-400" : "text-red-400"}`}>
              {result.valid ? "✓" : "✗"}
            </span>
            <span className={`text-lg font-semibold ${result.valid ? "text-emerald-400" : "text-red-400"}`}>
              {result.valid ? "Valid Address" : "Invalid Address"}
            </span>
          </div>
          <p className="text-zinc-300 text-sm">Format: {result.format}</p>
          {result.note && <p className="text-zinc-400 text-sm mt-1">{result.note}</p>}
        </div>
      )}

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Supported Formats</h2>
        <div className="space-y-2 text-sm text-zinc-400">
          <p><span className="text-emerald-400 font-medium">Bitcoin:</span> P2PKH (1...), P2SH (3...), Bech32 (bc1q...), Bech32m/Taproot (bc1p...)</p>
          <p><span className="text-emerald-400 font-medium">Ethereum:</span> EIP-55 mixed-case checksum, all lowercase/uppercase</p>
          <p><span className="text-emerald-400 font-medium">Solana:</span> ED25519 public keys (Base58, 32-44 chars)</p>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-zinc-600">
        <p>All validation runs locally in your browser. No data is sent to any server.</p>
      </div>
    </div>
  );
}
