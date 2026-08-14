"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { isPalindrome } from "@/lib/processing/text/allTextProcessors"
import { Check, X } from "lucide-react"

export default function Page() {
  return (
    <>
      <ToolPageMeta title="Palindrome Checker" description="Check if any word, phrase or sentence is a palindrome. Reads the same forwards and backwards." keywords="palindrome checker, free online tool, palindrome-checker, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Palindrome Checker" }]} />
      <TextToolTemplate
        title="Palindrome Checker"
        description="Check if any word, phrase or sentence is a palindrome. Reads the same forwards and backwards."
        placeholder="Enter text like 'racecar' or 'A man a plan a canal Panama'"
        badge="Text Tool"
        statsPanel={(text) => {
          if (!text) return null
          const r = isPalindrome(text)
          return (
            <div className="p-4 glass-card border border-theme rounded-xl">
              <h3 className="text-sm font-semibold text-theme-primary mb-3">Result</h3>
              <div className={`p-4 rounded-lg text-center ${r.isPalindrome ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                {r.isPalindrome ? (
                  <div className="text-green-500">
                    <Check className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold">Yes! It is a Palindrome</div>
                  </div>
                ) : (
                  <div className="text-red-500">
                    <X className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold">Not a Palindrome</div>
                  </div>
                )}
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2 rounded bg-theme-secondary">
                  <div className="text-theme-secondary mb-1">Cleaned:</div>
                  <div className="font-mono text-theme-primary break-all">{r.cleaned || "-"}</div>
                </div>
                <div className="p-2 rounded bg-theme-secondary">
                  <div className="text-theme-secondary mb-1">Reversed:</div>
                  <div className="font-mono text-theme-primary break-all">{r.reversed || "-"}</div>
                </div>
              </div>
            </div>
          )
        }}
      />
      <SEOSections toolSlug="palindrome-checker" toolName="Palindrome Checker" />
    </>
  )
}