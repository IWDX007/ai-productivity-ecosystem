import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/ui/ThemeProvider/ThemeProvider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AI Productivity Ecosystem - 200+ Free Online Tools",
    template: "%s | AI Productivity Ecosystem",
  },
  description: "200+ free online tools including calculators, converters, developer tools, image editors, PDF tools, security tools and more. All processing in your browser. 100% private.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className="min-h-screen antialiased flex flex-col"
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            <main className="flex-1 pb-16 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}