import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ToolAI — Free Online AI Tools",
    template: "%s — ToolAI",
  },
  description:
    "Free online AI-powered tools: AI humanizer, color palette generator, gradient generator, QR code generator, and more. No signup required.",
  openGraph: {
    title: "ToolAI — Free Online AI Tools",
    description:
      "Free online AI-powered tools: AI humanizer, color palette generator, gradient generator, QR code generator, and more.",
    type: "website",
  },
  keywords: [
    "AI tools",
    "free online tools",
    "AI humanizer",
    "color palette generator",
    "gradient generator",
    "image to base64",
    "word counter",
    "QR code generator",
    "image to prompt",
    "text to slug",
  ],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
