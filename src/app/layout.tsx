// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider/ThemeProvider";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
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
    default: "Get All In One Tools - 200+ Free Online Tools & AI Prompts",
    template: "%s | Get All In One Tools",
  },
  description:
    "200+ free online tools for text, calculators, developers, converters, security, QR codes, images, and PDFs. Plus AI prompt library with 20+ prompts.",
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
  authors: [{ name: "Get All In One Tools" }],
  creator: "Get All In One Tools",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://ai-productivity-ecosystem-azure.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-productivity-ecosystem-azure.vercel.app",
    title: "Get All In One Tools - 200+ Free Online Tools & AI Prompts",
    description:
      "200+ free online tools for productivity, development, and AI prompts.",
    siteName: "Get All In One Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get All In One Tools - 200+ Free Online Tools & AI Prompts",
    description:
      "200+ free online tools for productivity, development, and AI prompts.",
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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <GoogleAnalytics />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalLayout>{children}</ConditionalLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}