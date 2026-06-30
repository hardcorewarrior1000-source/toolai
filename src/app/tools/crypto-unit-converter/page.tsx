"use client";

import AdBanner from "@/components/AdBanner";
import InContentAd from "@/components/InContentAd";

import { useState, useEffect } from "react";

type CryptoUnit = "btc" | "eth" | "sol";

interface UnitDef {
  symbol: string;
  name: string;
  factor: number;
}

const UNITS: Record<CryptoUnit, UnitDef[]> = {
  btc: [
    { symbol: "BTC", name: "Bitcoin", factor: 1 },
    { symbol: "mBTC", name: "Millibitcoin", factor: 1e3 },
    { symbol: "bits", name: "Microbitcoin", factor: 1e6 },
    { symbol: "sats", name: "Satoshis", factor: 1e8 },
  ],
  eth: [
    { symbol: "ETH", name: "Ether", factor: 1 },
    { symbol: "Gwei", name: "Gwei", factor: 1e9 },
    { symbol: "Wei", name: "Wei", factor: 1e18 },
  ],
  sol: [
    { symbol: "SOL", name: "Solana", factor: 1 },
    { symbol: "lamports", name: "Lamports", factor: 1e9 },
  ],
};

export default function CryptoUnitConverterPage() {
  const [crypto, setCrypto] = useState<CryptoUnit>("btc");
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeField, setActiveField] = useState<string>("");

  const units = UNITS[crypto];

  useEffect(() => {
    setValues({});
    setActiveField("");
  }, [crypto]);

  const handleChange = (unitSymbol: string, rawValue: string) => {
    setActiveField(unitSymbol);
    const num = rawValue === "" ? NaN : parseFloat(rawValue);
    const newValues: Record<string, string> = {};

    if (isNaN(num)) {
      for (const u of units) newValues[u.symbol] = "";
    } else {
      const baseValue = num / units.find((u) => u.symbol === unitSymbol)!.factor;
      for (const u of units) {
        newValues[u.symbol] = String(parseFloat((baseValue * u.factor).toPrecision(12)));
      }
    }
    setValues(newValues);
  };

  const copyAll = () => {
    const text = units.map((u) => `${u.symbol}: ${values[u.symbol] || "0"}`).join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Crypto Unit Converter</h1>
      <p className="text-zinc-400 mb-8">
        Convert between BTC/sats, ETH/wei, and SOL/lamports instantly.
      </p>

      <div className="flex gap-2 mb-6">
        {(["btc", "eth", "sol"] as CryptoUnit[]).map((c) => (
          <button
            key={c}
            onClick={() => setCrypto(c)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              crypto === c ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
            }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        {units.map((unit) => (
          <div key={unit.symbol}>
            <label className="block text-sm text-zinc-400 mb-1">
              {unit.name} <span className="text-zinc-600">({unit.symbol})</span>
            </label>
            <input
              type="number"
              value={values[unit.symbol] ?? ""}
              onChange={(e) => handleChange(unit.symbol, e.target.value)}
              placeholder="0"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-lg placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        ))}

        <button onClick={copyAll} className="w-full mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors">
          Copy All Values
        </button>
      </div>

      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Unit Reference</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-zinc-400">
          <div>
            <p className="text-emerald-400 font-medium mb-1">Bitcoin</p>
            <p>1 BTC = 1,000 mBTC</p>
            <p>1 BTC = 1,000,000 bits</p>
            <p>1 BTC = 100,000,000 sats</p>
          </div>
          <div>
            <p className="text-emerald-400 font-medium mb-1">Ethereum</p>
            <p>1 ETH = 1e9 Gwei</p>
            <p>1 ETH = 1e18 Wei</p>
            <p>1 Gwei = 1e9 Wei</p>
          </div>
          <div>
            <p className="text-emerald-400 font-medium mb-1">Solana</p>
            <p>1 SOL = 1e9 lamports</p>
          </div>
        </div>
      </div>
    </div>
  );
}
