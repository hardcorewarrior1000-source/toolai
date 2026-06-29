import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about AI tools, tips, and tutorials from ToolAI.",
};

const posts = [
  {
    slug: "how-to-humanize-ai-text",
    title: "How to Humanize AI Text: A Complete Guide",
    excerpt: "Learn how to make AI-generated content sound natural, engaging, and human-like with practical techniques.",
    date: "2026-06-29",
  },
  {
    slug: "best-free-ai-tools-2026",
    title: "Best Free AI Tools (2026)",
    excerpt: "A curated list of the best free AI tools for writing, design, development, and more.",
    date: "2026-06-28",
  },
  {
    slug: "what-is-image-to-prompt",
    title: "What Is Image to Prompt? A Beginner's Guide",
    excerpt: "Discover how reverse prompt engineering works and how to use AI to describe images.",
    date: "2026-06-27",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold text-white hover:text-emerald-400 transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-zinc-400 text-sm mb-3">{post.excerpt}</p>
            <time className="text-xs text-zinc-600">{post.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
}
