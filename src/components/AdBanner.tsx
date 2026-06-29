export default function AdBanner() {
  const adScript = process.env.NEXT_PUBLIC_AD_SCRIPT;

  if (adScript) {
    return (
      <div className="w-full my-8" dangerouslySetInnerHTML={{ __html: adScript }} />
    );
  }

  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-center text-zinc-600 text-sm my-8">
      <div className="h-24 flex items-center justify-center">
        <span className="text-zinc-700">Ad Space</span>
      </div>
    </div>
  );
}
