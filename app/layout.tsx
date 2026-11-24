import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Samarth Rachcha is a computer science student in Pune building machine-learning systems end to end: CCTV crowd forecasting at 15.8 FPS, a LangChain financial advisor, a 1.5-million-review recommender, and the interfaces that make them usable.";

export const metadata: Metadata = {
  title: {
    default: "Samarth Rachcha — Machine learning & interfaces",
    template: "%s — Samarth Rachcha",
  },
  description,
  keywords: [
    "Samarth Rachcha",
    "machine learning",
    "portfolio",
    "Python",
    "TypeScript",
    "Next.js",
    "computer vision",
    "LSTM",
  ],
  authors: [{ name: "Samarth Rachcha", url: "https://github.com/SamarthRachcha" }],
  creator: "Samarth Rachcha",
  openGraph: {
    title: "Samarth Rachcha — Machine learning & interfaces",
    description,
    type: "website",
    siteName: "Samarth Rachcha",
  },
  twitter: {
    card: "summary",
    title: "Samarth Rachcha — Machine learning & interfaces",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
