"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

const faqs = [
  { category: "General", questions: [
    { q: "What is AI Productivity Ecosystem?", a: "A free platform with 200+ tools for text, calculations, developers, converters, security, QR codes, images, PDFs, and AI prompts. All tools run in your browser." },
    { q: "Is it really free?", a: "Yes! All 200+ tools are free. No sign-up, no hidden costs, no watermarks." },
    { q: "Do I need an account?", a: "No account required. Use all tools instantly without registration." },
    { q: "Are tools mobile-friendly?", a: "Yes, fully responsive on all devices." },
  ]},
  { category: "Privacy", questions: [
    { q: "Is my data safe?", a: "All processing happens in your browser. Files never leave your device." },
    { q: "Do you save files?", a: "No. All operations are local. Nothing stored on our servers." },
    { q: "Do you use cookies?", a: "Minimal cookies for analytics. See our Cookie Policy." },
  ]},
  { category: "Tools", questions: [
    { q: "How many tools?", a: "200+ across 8 categories: Text, Calculators, Developer, Converters, Security, QR, Image, PDF." },
    { q: "Can I request a tool?", a: "Yes! Contact us via the Contact page." },
    { q: "Do tools work offline?", a: "Once loaded, most tools work offline." },
    { q: "Any usage limits?", a: "No limits. Use as much as you want." },
  ]},
  { category: "AI Prompts", questions: [
    { q: "What are AI prompts?", a: "Pre-written instructions for ChatGPT, Midjourney, DALL-E and more." },
    { q: "How to use prompts?", a: "Click any prompt, copy it, paste into your AI tool, customize placeholders." },
    { q: "Are prompts free?", a: "Yes, all prompts are free to use and modify." },
  ]},
  { category: "Technical", questions: [
    { q: "Supported browsers?", a: "Chrome, Firefox, Safari, Edge, Opera. Latest versions recommended." },
    { q: "Tool not working?", a: "Try refreshing or clearing cache. Contact us if issues persist." },
    { q: "Commercial use?", a: "Yes, tools can be used commercially. See Terms of Service." },
  ]},
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const toggle = (ci: number, qi: number) => {
    const key = `${ci}-${qi}`
    setOpenIndex(openIndex === key ? null : key)
  }
  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <div className="text-center mb-12 mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4"><HelpCircle className="w-4 h-4" />Help Center</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">Frequently Asked <span className="gradient-text">Questions</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto text-lg">Find answers to common questions.</p>
        </div>
        <div className="space-y-8">
          {faqs.map((cat, ci) => (
            <div key={cat.category}>
              <h2 className="text-2xl font-bold text-theme-primary mb-4">{cat.category}</h2>
              <div className="space-y-3">
                {cat.questions.map((faq, qi) => {
                  const isOpen = openIndex === `${ci}-${qi}`
                  return (
                    <div key={qi} className="glass-card rounded-xl overflow-hidden">
                      <button onClick={() => toggle(ci, qi)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-theme-secondary/50 transition">
                        <span className="font-semibold text-theme-primary pr-4">{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-theme-muted flex-shrink-0" />}
                      </button>
                      {isOpen && <div className="px-6 pb-4 text-theme-secondary">{faq.a}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-theme-primary mb-2">Still have questions?</h3>
          <p className="text-theme-secondary mb-6">Get in touch with our team.</p>
          <a href="/contact" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition">Contact Us</a>
        </div>
      </div>
    </div>
  )
}