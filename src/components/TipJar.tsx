export default function TipJar() {
  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold text-white mb-2">Support ToolAI</h3>
      <p className="text-zinc-400 text-sm mb-4">
        Like this tool? Send a tip to support free online AI tools.
      </p>
      <div className="space-y-2 text-left">
        <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
          <p className="text-xs text-zinc-500 mb-1">Solana</p>
          <p className="font-mono text-xs text-emerald-400 break-all">BeS2p6srqB11aTAKCFazCTsCwhpeCZwQtfbBqegp3LsT</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
          <p className="text-xs text-zinc-500 mb-1">Ethereum / BSC / Polygon</p>
          <p className="font-mono text-xs text-emerald-400 break-all">0xAD99329d02c2cD485Dc86EF0E6FbaDCB0702b551</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-3">
          <p className="text-xs text-zinc-500 mb-1">Bitcoin</p>
          <p className="font-mono text-xs text-emerald-400 break-all">bc1q3h9a3q4axug2csc68858mnjtpqpv0zl9f930jr</p>
        </div>
      </div>
    </div>
  );
}
