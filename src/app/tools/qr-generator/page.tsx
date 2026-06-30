import type { Metadata } from "next";
import QRGeneratorTool from "./ToolClient";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "QR Code Generator — Free Online Tool | Zelve Tool AI",
  description: "Generate scannable QR codes from any text or URL. Choose error correction level and size. Download as PNG instantly. Free and fast.",
  keywords: ["QR code generator", "create QR code", "QR code maker", "free QR code", "URL to QR code", "download QR code", "Zelve QR generator"],
  openGraph: {
    title: "QR Code Generator — Free Online Tool",
    description: "Generate scannable QR codes from any text or URL. Choose error correction level and size. Download as PNG instantly.",
    type: "website",
    siteName: "Zelve Tool AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator — Free Online Tool",
    description: "Generate scannable QR codes from any text or URL. Choose error correction level and size. Download as PNG instantly.",
  },
};

export default function QRGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "QR Code Generator",
            url: "https://toolai.zelve.xyz/tools/qr-generator",
            description: "Generate scannable QR codes from any text or URL with customizable error correction and size.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a QR code?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A QR code (Quick Response code) is a type of matrix barcode that stores information as black and white patterns. It can be scanned by smartphones and QR readers to quickly access URLs, text, or other data.",
                },
              },
              {
                "@type": "Question",
                name: "What does error correction level mean?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Error correction determines how much of the QR code can be damaged or obscured while still being readable. Low (7%), Medium (15%), Quartile (25%), and High (30%) — higher levels allow for partially covered QR codes.",
                },
              },
              {
                "@type": "Question",
                name: "What size QR code should I generate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For most use cases, 300px is ideal. Use 200px for small inline uses, 400px for posters, and 500px for large prints or billboards.",
                },
              },
              {
                "@type": "Question",
                name: "Can I encode a URL in a QR code?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Simply paste or type the URL into the input field and a scannable QR code will be generated instantly. Most smartphone cameras can scan QR codes directly from the camera app.",
                },
              },
            ],
          }),
        }}
      />
      <QRGeneratorTool />
      <SEOContent
        title="About the QR Code Generator"
        description="Generate scannable QR codes from any text, URL, or data with this free online QR Code Generator. Choose from 4 error correction levels and 4 size options, then download your QR code as a PNG file instantly. Built with the qrcode library for reliable, standards-compliant QR code generation."
        features={[
          "Generate QR codes from any text, URL, or data",
          "4 error correction levels: Low (7%), Medium (15%), Quartile (25%), High (30%)",
          "4 size options from 200px to 500px",
          "Download as PNG with one click",
          "Real-time QR preview as you type",
          "Works entirely in your browser — no data sent to servers",
        ]}
        howToUse={[
          "Enter the text or URL you want to encode in the input field.",
          "Select an error correction level — higher levels allow the QR code to be partially obscured.",
          "Choose a size that matches your use case.",
          "Click Download to save the QR code as a PNG file.",
        ]}
        faq={[
          { question: "What error correction level should I use?", answer: "Use Medium (M) for general purposes. Choose High (H) if you need to overlay a logo on the QR code, as it allows up to 30% damage while remaining scannable." },
          { question: "Can I scan a QR code with my phone?", answer: "Yes, most modern smartphones can scan QR codes directly through the camera app. No special app is needed on iOS 11+ or Android 9+." },
          { question: "Is there a limit to how much data I can encode?", answer: "QR codes can store up to 4,296 alphanumeric characters. For URLs, this is more than enough. Very long text may require a higher error correction level and larger size." },
        ]}
      />
    </>
  );
}
