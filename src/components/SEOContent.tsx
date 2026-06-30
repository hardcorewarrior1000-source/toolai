interface SEOContentProps {
  title: string;
  description: string;
  features: string[];
  howToUse: string[];
  faq: { question: string; answer: string }[];
}

export default function SEOContent({ title, description, features, howToUse, faq }: SEOContentProps) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 border-t border-zinc-800 mt-12">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-zinc-400 leading-relaxed mb-6">{description}</p>

      <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
      <ul className="text-zinc-400 space-y-2 mb-6 list-disc pl-5">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold text-white mb-3">How to Use</h3>
      <ol className="text-zinc-400 space-y-2 mb-6 list-decimal pl-5">
        {howToUse.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ol>

      <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faq.map((q, i) => (
          <div key={i}>
            <p className="font-medium text-white mb-1">{q.question}</p>
            <p className="text-zinc-400 leading-relaxed">{q.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
