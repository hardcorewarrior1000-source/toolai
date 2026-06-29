import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  category?: string;
}

export default function ToolCard({ title, description, href, icon, category }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-6 hover:border-emerald-500/40 hover:bg-zinc-800/40 transition-all duration-300 card-glow"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {category && (
          <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-medium bg-zinc-800/50 px-2 py-0.5 rounded-full">
            {category}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed group-hover:text-zinc-400 transition-colors duration-200">{description}</p>
    </Link>
  );
}
