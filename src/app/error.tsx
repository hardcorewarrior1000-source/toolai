"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-400 mb-4">Something went wrong</h1>
        <p className="text-zinc-400 mb-8">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
