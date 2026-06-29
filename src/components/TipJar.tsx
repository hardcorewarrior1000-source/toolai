export default function TipJar() {
  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold text-white mb-2">Support ToolAI</h3>
      <p className="text-zinc-400 text-sm mb-4">
        Like this tool? Send a tip to support free online AI tools.
      </p>
      <div className="inline-flex items-center gap-2 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 font-mono text-xs text-emerald-400">
        0xYourWalletAddressHere
      </div>
      <p className="text-zinc-600 text-xs mt-3">ETH / BSC / Polygon — any EVM chain</p>
    </div>
  );
}
