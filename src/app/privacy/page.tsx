import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Zelve Tool AI — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
        <p>
          Zelve Tool AI does not collect, store, or share any personal data. All tools run entirely in your
          browser — no images, text, or files are uploaded to any server.
        </p>
        <p>
          We use Google Analytics to understand how visitors use the site. Google Analytics collects
          anonymized data such as page views, browser type, and session duration. This data helps us
          improve the site. You can opt out via the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" className="text-emerald-400 underline">
            Google Analytics opt-out browser add-on
          </a>
          .
        </p>
        <p>
          If we display ads via a third-party ad network, they may use cookies to serve relevant
          advertisements. We do not control these cookies.
        </p>
        <p>
          By using Zelve Tool AI, you consent to this policy. If you have questions, contact us via the
          About page.
        </p>
      </div>
    </div>
  );
}
