"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function HtmlEntitiesDecoderPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const decode = () => {
    if (!input.trim()) return
    setOutput(input
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&copy;/g, "Ã‚Â©")
      .replace(/&reg;/g, "Ã‚Â®")
      .replace(/&trade;/g, "Ã¢â€žÂ¢")
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16))))
  }

  const copy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="HTML Entities Decoder" description="Decode HTML entities back to normal characters." keywords="html entities decoder, free online tool, html-entities-decoder, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "HTML Entities Decoder" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            HTML Entities <span className="gradient-text">Decoder</span>
          </h1>
          <p className="text-theme-secondary text-lg">Decode HTML entities back to normal characters.</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-theme-primary font-medium block mb-2">Encoded HTML</label>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                placeholder="&lt;h1&gt;Hello &quot;World&quot;&lt;/h1&gt;" rows={10}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-primary font-medium">Decoded Text</label>
                <button onClick={copy} className="text-theme-muted hover:text-crimson-500 transition-colors">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <textarea value={output} readOnly placeholder="Decoded text..." rows={10}
                className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none" />
            </div>
          </div>
          <button onClick={decode} className="btn-primary px-8 py-2.5 rounded-xl font-medium mt-4">
            Decode Entities
          </button>
        </div>
      </div>
</div>
  )
}