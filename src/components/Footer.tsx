export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} ToolAI. Free online AI tools.</p>
        <div className="flex items-center gap-4">
          <address className="not-italic">
            Tip jar: <span className="text-emerald-400 font-mono text-xs">0x...YourWalletHere</span>
          </address>
        </div>
      </div>
    </footer>
  );
}
