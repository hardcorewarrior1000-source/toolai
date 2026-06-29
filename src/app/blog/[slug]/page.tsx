import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdBanner from "@/components/AdBanner";

const posts: Record<string, { title: string; date: string; content: string[] }> = {
  "how-to-humanize-ai-text": {
    title: "How to Humanize AI Text: A Complete Guide",
    date: "2026-06-29",
    content: [
      "AI-generated text has become incredibly sophisticated, but it still has a telltale rhythm and vocabulary that readers can spot. Whether you're a content creator, student, or professional, knowing how to make AI text sound more natural is a valuable skill.",
      "Why Humanize AI Text? AI writing tends to be overly formal, repetitive in sentence structure, and heavy on transition words like 'however', 'furthermore', and 'in conclusion'. Human readers prefer variety, contractions, and a conversational flow.",
      "Key Techniques: 1) Replace formal words with everyday alternatives — 'utilize' becomes 'use', 'commence' becomes 'start'. 2) Add contractions — 'I am' becomes 'I'm', 'cannot' becomes 'can't'. 3) Vary sentence length — mix short punchy sentences with longer ones. 4) Remove AI phrases like 'as an AI language model'. 5) Add personal touches — opinions, examples, and natural discourse markers like 'actually' or 'honestly'.",
      "Using ToolAI's AI Humanizer: Our free AI humanizer tool at ToolAI automates this process. Just paste your AI-generated text, choose your transformation strength (Light/Medium/Aggressive), and get human-sounding output instantly. Over 60 transformation rules clean up formal language, add contractions, and inject natural conversational flow.",
      "Try it yourself at ToolAI's AI Humanizer and see the difference. For best results, always review the output and add your own voice to make it truly authentic.",
    ],
  },
  "best-free-ai-tools-2026": {
    title: "Best Free AI Tools (2026)",
    date: "2026-06-28",
    content: [
      "The AI landscape in 2026 is more exciting than ever, with powerful tools available for free. Here's our curated list of the best free AI tools across different categories.",
      "Writing & Content: ToolAI's AI Humanizer converts robotic AI text into natural-sounding prose. Grammarly's AI assistant helps polish your writing. Claude (free tier) excels at long-form content and analysis.",
      "Design & Visual: Canva's AI design tools let you generate images, remove backgrounds, and create presentations. Our Color Palette from Image tool extracts beautiful color schemes from any photo. The Gradient Generator creates stunning CSS gradients in seconds.",
      "Development: GitHub Copilot (free for students and open-source). ToolAI's Image to Base64 converter and QR Code Generator are handy utilities for web developers. Our Text to Slug converter creates SEO-friendly URLs instantly.",
      "Data & Analysis: Google's Gemini handles complex data analysis. ChatGPT's free tier remains powerful for research and brainstorming. ToolAI's Word Counter provides detailed stats including reading time and speaking time.",
      "All these tools are free to use with no hidden costs. For developers and creators on a budget, they provide everything needed to produce professional-quality work.",
    ],
  },
  "what-is-image-to-prompt": {
    title: "What Is Image to Prompt? A Beginner's Guide",
    date: "2026-06-27",
    content: [
      'Image to Prompt is a technique where you describe an image in natural language — essentially reversing the AI image generation process. Instead of "text to image" (generating an image from a description), Image to Prompt creates a description from an image.',
      "How It Works: Advanced AI vision models analyze an image and generate a textual description that captures: the subject and its attributes, the setting and background, the composition and style, colors, lighting, and mood, any text or symbols present.",
      "Why It's Useful: 1) Reverse engineering — understand what prompt was used to generate an AI image. 2) Accessibility — generate alt text for visually impaired users. 3) Content discovery — describe images for better search indexing. 4) Learning — understand how AI describes visual elements.",
      "Practical Applications: E-commerce sites can auto-generate product descriptions. Photographers can catalog their portfolios with detailed metadata. Social media managers can create consistent branding descriptions. Developers can generate alt text at scale.",
      "At ToolAI, we're building tools to make this process accessible to everyone. Whether you're analyzing an image for SEO, accessibility, or creative inspiration, understanding Image to Prompt opens up new possibilities for how we interact with visual content.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.content[0]?.slice(0, 160),
  };
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors mb-6 inline-block">
        &larr; Back to Blog
      </Link>

      <article>
        <h1 className="text-3xl font-bold text-white mb-3">{post.title}</h1>
        <time className="text-sm text-zinc-500 mb-8 block">{post.date}</time>

        <div className="space-y-4 text-zinc-300 leading-relaxed">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      <AdBanner />
    </div>
  );
}
