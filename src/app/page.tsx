import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";

const tools = [
  {
    title: "AI to Human Text",
    description: "Convert AI-generated text to sound more natural and human-like with one click.",
    href: "/tools/ai-humanizer",
    icon: "🤖",
  },
  {
    title: "Color Palette from Image",
    description: "Upload an image and extract a beautiful color palette instantly.",
    href: "/tools/color-palette",
    icon: "🎨",
  },
  {
    title: "Gradient Generator",
    description: "Create stunning CSS gradients with a visual drag-and-drop editor.",
    href: "/tools/gradient-generator",
    icon: "🌈",
  },
  {
    title: "Image to Base64",
    description: "Convert any image to a Base64 data URL for embedding in code.",
    href: "/tools/image-to-base64",
    icon: "🖼️",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs with reading time.",
    href: "/tools/word-counter",
    icon: "📝",
  },
  {
    title: "Text to URL Slug",
    description: "Convert any text into a clean, SEO-friendly URL slug.",
    href: "/tools/text-to-slug",
    icon: "🔗",
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes from any text or URL and download them as PNG.",
    href: "/tools/qr-generator",
    icon: "📱",
  },
  {
    title: "Image to Prompt",
    description: "Upload any image and get a detailed AI prompt for Midjourney, DALL-E, Stable Diffusion.",
    href: "/tools/image-to-prompt",
    icon: "🖼️",
  },
  {
    title: "Password Generator",
    description: "Generate secure, cryptographically random passwords with custom length and character options.",
    href: "/tools/password-generator",
    icon: "🔐",
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data instantly with syntax error detection.",
    href: "/tools/json-formatter",
    icon: "{}",
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Free AI-Powered{" "}
          <span className="text-emerald-400">Online Tools</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Fast, free, no signup required. Use our tools directly in your browser.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {tools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>

      <AdBanner />
    </div>
  );
}
