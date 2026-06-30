"use client";

import { useLocale } from "@/i18n/provider";

interface SEOContentProps {
  toolId: string;
}

export default function SEOContent({ toolId }: SEOContentProps) {
  const { t } = useLocale();
  const seo = t.seo[toolId];
  if (!seo) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 border-t border-zinc-800 mt-12">
      <h2 className="text-2xl font-bold text-white mb-4">{t.tools[toolId]?.title || toolId}</h2>
      <p className="text-zinc-400 leading-relaxed mb-6">{seo.description}</p>

      <h3 className="text-lg font-semibold text-white mb-3">{t.seoHeadings.keyFeatures}</h3>
      <ul className="text-zinc-400 space-y-2 mb-6 list-disc pl-5">
        {seo.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-white mb-3">{t.seoHeadings.howToUse}</h3>
      <ol className="text-zinc-400 space-y-2 mb-6 list-decimal pl-5">
        {seo.howToUse.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ol>

      <h3 className="text-lg font-semibold text-white mb-3">{t.seoHeadings.faq}</h3>
      <div className="space-y-4">
        {seo.faq.map((q, i) => (
          <div key={i}>
            <p className="font-medium text-white mb-1">{q.q}</p>
            <p className="text-zinc-400 leading-relaxed">{q.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
