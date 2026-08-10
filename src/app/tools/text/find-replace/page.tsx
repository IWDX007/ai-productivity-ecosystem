"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { findReplace } from "@/lib/processing/text/allTextProcessors"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Copy, Check } from "lucide-react"

export default function Page() {
  const [text, setText] = useState("")
  const [find, setFind] = useState("")
  const [replace, setReplace] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [regex, setRegex] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => findReplace(text, find, replace, { caseSensitive, regex, wholeWord }), [text, find, replace, caseSensitive, regex, wholeWord])
  const matches = useMemo(() => {
    if (!find || !text) return 0
    try {
      const pattern = regex ? new RegExp(find, caseSensitive ? "g" : "gi") : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), caseSensitive ? "g" : "gi")
      return (text.match(pattern) || []).length
    } catch { return 0 }
  }, [text, find, caseSensitive, regex])

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <ToolPageMeta title="Find Replace" description="Free online Find Replace tool. Fast, secure, and easy to use. No registration required." keywords="find replace, free online tool, find-replace, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Find & Replace" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Text Tool</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Find & <span className="gradient-text">Replace</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Find and replace text with regex, case-sensitive and whole-word options.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find..." className="p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" />
          <input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replace with..." className="p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" />
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center gap-2 text-sm text-theme-primary cursor-pointer">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="accent-crimson-500" /> Case Sensitive
          </label>
          <label className="flex items-center gap-2 text-sm text-theme-primary cursor-pointer">
            <input type="checkbox" checked={wholeWord} onChange={(e) => setWholeWord(e.target.checked)} disabled={regex} className="accent-crimson-500" /> Whole Word
          </label>
          <label className="flex items-center gap-2 text-sm text-theme-primary cursor-pointer">
            <input type="checkbox" checked={regex} onChange={(e) => setRegex(e.target.checked)} className="accent-crimson-500" /> Regex Mode
          </label>
          {matches > 0 && <span className="text-sm text-crimson-500 font-semibold">{matches} match{matches !== 1 ? "es" : ""} found</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Input:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your text..." className="w-full min-h-[400px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 resize-y" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-theme-primary">Output:</label>
              <button onClick={copy} disabled={!output} className="flex items-center gap-1 px-3 py-1 text-xs btn-primary rounded disabled:opacity-50">
                {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <textarea value={output} readOnly className="w-full min-h-[400px] p-4 bg-theme-card border border-crimson-500/20 rounded-xl text-theme-primary resize-y" />
          </div>
        </div>
      </section>

      <SEOSections toolSlug="find-replace" toolName="Find and Replace" />
    </>
  )
}