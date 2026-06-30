import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Zelve Tool AI",
  description: "Privacy Policy for Zelve Tool AI. Learn how we handle your data, cookies, and tracking. We prioritize your privacy — no data collection, no tracking.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-zinc-500 text-sm mb-8">Last updated: June 30, 2026</p>

      <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Overview</h2>
          <p>
            Zelve Tool AI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website at toolai.zelve.xyz.
            This Privacy Policy explains how we collect, use, and protect information when you use our website and tools.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Data We Do NOT Collect</h2>
          <p>
            All tools on Zelve Tool AI run entirely in your browser. We do not collect, store, or share:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Any text, images, or files you process with our tools</li>
            <li>Your API keys for AI services (OpenAI, OpenRouter, Gemini, Groq)</li>
            <li>Any personal information unless you voluntarily provide it (e.g., email for account creation)</li>
            <li>Crypto wallet addresses or transaction data you enter</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Information We Collect</h2>
          <p><strong className="text-zinc-300">Account Information:</strong> If you create an account, we store your email address and password hash in our database. We never store plaintext passwords.</p>
          <p className="mt-2"><strong className="text-zinc-300">Usage Analytics:</strong> We use Google Analytics to understand how visitors use the site. This collects anonymized data including:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Page views and session duration</li>
            <li>Browser type and device information</li>
            <li>Referring website</li>
            <li>Geographic region (country level only)</li>
          </ul>
          <p className="mt-2">
            You can opt out of Google Analytics using the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className="text-emerald-400 underline" target="_blank" rel="noopener noreferrer">
              Google Analytics opt-out browser add-on
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Cookies</h2>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li><strong className="text-zinc-300">Essential cookies:</strong> Session cookies for authentication (if you create an account). These are required for the site to function.</li>
            <li><strong className="text-zinc-300">Analytics cookies:</strong> Set by Google Analytics to track usage patterns.</li>
            <li><strong className="text-zinc-300">Advertising cookies:</strong> Set by our ad network (ExoClick) to serve relevant advertisements. These are only present for free tier users.</li>
          </ul>
          <p className="mt-2">
            You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Third-Party Services</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong className="text-zinc-300">Google Analytics:</strong> Usage analytics. See <a href="https://policies.google.com/privacy" className="text-emerald-400 underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
            <li><strong className="text-zinc-300">ExoClick:</strong> Advertising network. See <a href="https://www.exoclick.com/privacy/" className="text-emerald-400 underline" target="_blank" rel="noopener noreferrer">ExoClick&apos;s Privacy Policy</a>.</li>
            <li><strong className="text-zinc-300">Cloudflare:</strong> Hosting and CDN. See <a href="https://www.cloudflare.com/privacypolicy/" className="text-emerald-400 underline" target="_blank" rel="noopener noreferrer">Cloudflare&apos;s Privacy Policy</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Data Retention</h2>
          <p>
            Account data (email, password hash) is retained as long as your account is active.
            You can delete your account at any time by contacting us. Analytics data is retained
            by Google Analytics per their standard retention policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Access the personal data we hold about you</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of data collection</li>
            <li>Export your data</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us via the{" "}
            <a href="/about" className="text-emerald-400 underline">About page</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Children&apos;s Privacy</h2>
          <p>
            Zelve Tool AI is not directed to children under 13. We do not knowingly collect
            personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page with an updated &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us via the{" "}
            <a href="/about" className="text-emerald-400 underline">About page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
