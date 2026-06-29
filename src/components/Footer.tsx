import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} ToolAI. Free online AI tools.</p>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <Link href="/pricing" className="hover:text-zinc-300 transition-colors">Pricing</Link>
          <Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link>
          <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
          <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
