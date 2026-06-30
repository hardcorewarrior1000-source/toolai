import Link from "next/link";
import { type ReactNode } from "react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  emoji?: string;
  category?: string;
  popular?: boolean;
}

const categoryColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  AI: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", glow: "hover:shadow-emerald-500/10" },
  Dev: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "hover:shadow-blue-500/10" },
  Crypto: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", glow: "hover:shadow-amber-500/10" },
};

export default function ToolCard({ title, description, href, icon, emoji, category, popular }: ToolCardProps) {
  const colors = category ? categoryColors[category] || categoryColors.AI : null;

  return (
    <Link
      href={href}
      className={`group block bg-zinc-900/60 border rounded-xl p-5 hover:shadow-lg transition-all duration-300 relative ${
        colors
          ? `border-zinc-800/60 hover:${colors.border} ${colors.glow}`
          : "border-zinc-800/60 hover:border-emerald-500/40 hover:shadow-emerald-500/10"
      }`}
    >
      {popular && (
        <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
          POPULAR
        </span>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors ? colors.bg : "bg-zinc-800"}`}>
          {icon ? (
            <div className={colors ? colors.text : "text-emerald-400"}>
              {icon}
            </div>
          ) : (
            <span className="text-2xl">{emoji}</span>
          )}
        </div>
        {category && (
          <span className={`text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${colors ? `${colors.bg} ${colors.text}` : "bg-zinc-800 text-zinc-500"}`}>
            {category}
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors duration-200 mb-1">
        {title}
      </h3>
      <p className="text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-400 transition-colors duration-200 line-clamp-2">
        {description}
      </p>
    </Link>
  );
}
