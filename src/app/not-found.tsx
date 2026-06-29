import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-emerald-400 mb-4">404</h1>
        <p className="text-xl text-zinc-300 mb-2">Page not found</p>
        <p className="text-zinc-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            Back to Home
          </Link>
          <Link
            href="/tools/ai-humanizer"
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Try AI Humanizer
          </Link>
        </div>
      </div>
    </div>
  );
}
