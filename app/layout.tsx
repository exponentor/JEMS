import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClickRipple from "@/components/ClickRipple";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jems — Bridge the Gap Between Learning & Hiring",
  description:
    "AI-powered education-to-employment platform. Get job-ready with personalized AI learning, ace interviews with mock practice, and land offers from companies seeking your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="relative min-h-full bg-white font-sans text-navy">
        {/* One fixed background canvas behind every section — the whole page
            shares this exact background, eliminating per-section seams. */}
        <div
          aria-hidden="true"
          className="bg-page-canvas pointer-events-none fixed inset-0 -z-10"
        />
        {children}
        <ClickRipple />
      </body>
    </html>
  );
}
