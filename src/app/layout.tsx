// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

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
    default: "AI Productivity Ecosystem - 201+ Free Online Tools",
    template: "%s | AI Productivity Ecosystem",
  },
  description:
    "201+ free online tools for text, calculators, developers, converters, security, QR codes, images, and PDFs. Plus AI prompt library with 20+ prompts.",
  keywords: [
    "free online tools",
    "text tools",
    "calculators",
    "developer tools",
    "converters",
    "security tools",
    "QR code generator",
    "image tools",
    "PDF tools",
    "AI prompts",
  ],
  authors: [{ name: "AI Productivity Ecosystem" }],
  creator: "AI Productivity Ecosystem",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://ai-productivity-ecosystem-azure.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-productivity-ecosystem-azure.vercel.app",
    title: "AI Productivity Ecosystem - 201+ Free Online Tools",
    description:
      "201+ free online tools for productivity, development, and AI prompts.",
    siteName: "AI Productivity Ecosystem",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Productivity Ecosystem - 201+ Free Online Tools",
    description:
      "201+ free online tools for productivity, development, and AI prompts.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}