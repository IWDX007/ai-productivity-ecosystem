"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container mx-auto px-4 py-12 md:py-16 border-t border-theme">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-3">{title}</h2>
        <p className="text-theme-secondary">Everything you need to know</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-card border border-theme rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-theme-secondary transition-colors"
            >
              <span className="text-theme-primary font-medium">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-theme-secondary transition-transform ${open === idx ? "rotate-180" : ""}`} />
            </button>
            {open === idx && (
              <div className="px-5 pb-5 text-sm text-theme-secondary leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}