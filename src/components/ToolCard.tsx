import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
        {title}
      </h3>
      <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{description}</p>
    </Link>
  );
}
