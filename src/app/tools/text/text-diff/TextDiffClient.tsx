"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { diffTexts } from "@/lib/processing/text/allTextProcessors"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
interface Props { name: string; description: string; }
export default function TextDiffClient({ name, description }: Props) {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const diff = useMemo(() => diffTexts(text1, text2), [text1, text2])
  const stats = useMemo(() => ({
    changed: diff.filter(d => d.status === "changed").length,
    added: diff.filter(d => d.status === "added").length,
    removed: diff.filter(d => d.status === "removed").length,
  }), [diff])

  const bg = (s: string) => {
    if (s === "added") return "bg-green-500/10 border-l-4 border-green-500"
    if (s === "removed") return "bg-red-500/10 border-l-4 border-red-500"
    if (s === "changed") return "bg-yellow-500/10 border-l-4 border-yellow-500"
    return ""
  }

  return (
    <>
      <ToolPageMeta title="Text Diff" description="Free online Text Diff tool. Fast, secure, and easy to use. No registration required." keywords="text diff, free online tool, text-diff, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Diff" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Text Tool</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Text <span className="gradient-text">Diff Checker</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Compare two texts side-by-side and see differences highlighted.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Original Text:</label>
            <textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Paste original text..." className="w-full min-h-[250px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 resize-y font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Changed Text:</label>
            <textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Paste changed text..." className="w-full min-h-[250px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 resize-y font-mono text-sm" />
          </div>
        </div>

        {(text1 || text2) && (
          <>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded bg-yellow-500"></span><span className="text-theme-secondary">Changed: <b className="text-theme-primary">{stats.changed}</b></span></div>
              <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded bg-green-500"></span><span className="text-theme-secondary">Added: <b className="text-theme-primary">{stats.added}</b></span></div>
              <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded bg-red-500"></span><span className="text-theme-secondary">Removed: <b className="text-theme-primary">{stats.removed}</b></span></div>
            </div>

            <div className="glass-card border border-theme rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-theme">
                <div className="p-2 bg-theme-secondary text-center text-xs font-semibold text-theme-primary">Original</div>
                <div className="p-2 bg-theme-secondary text-center text-xs font-semibold text-theme-primary">Changed</div>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                {diff.map((d, i) => (
                  <div key={i} className="grid grid-cols-2 divide-x divide-theme text-xs font-mono">
                    <div className={`p-2 ${bg(d.status === "added" ? "" : d.status)}`}>
                      <span className="text-theme-muted mr-2">{d.line}</span>
                      <span className="text-theme-primary">{d.left || <span className="opacity-30">ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â</span>}</span>
                    </div>
                    <div className={`p-2 ${bg(d.status === "removed" ? "" : d.status)}`}>
                      <span className="text-theme-muted mr-2">{d.line}</span>
                      <span className="text-theme-primary">{d.right || <span className="opacity-30">ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â</span>}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
</>
  )
}