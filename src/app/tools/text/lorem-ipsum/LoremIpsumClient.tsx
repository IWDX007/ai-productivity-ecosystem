"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { generateLorem } from "@/lib/processing/text/allTextProcessors"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Copy, Check, RefreshCw } from "lucide-react"

interface Props { name: string; description: string; }
export default function LoremIpsumClient({ name, description }: Props) {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<"words" | "sentences" | "paragraphs">("paragraphs")
  const [seed, setSeed] = useState(0)
  const [copied, setCopied] = useState(false)
  const output = useMemo(() => generateLorem(count, type), [count, type, seed])

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <ToolPageMeta title="Lorem Ipsum" description="Free online Lorem Ipsum tool. Fast, secure, and easy to use. No registration required." keywords="lorem ipsum, free online tool, lorem-ipsum, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Lorem Ipsum" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Generator</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Lorem Ipsum <span className="gradient-text">Generator</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Generate lorem ipsum placeholder text for your designs, mockups and prototypes.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500">
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">Count</label>
            <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" />
          </div>
          <div className="flex items-end gap-2">
            <button onClick={() => setSeed(s => s + 1)} className="flex-1 flex items-center justify-center gap-2 p-3 bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded-lg transition-colors text-theme-primary">
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
            <button onClick={copy} className="flex items-center justify-center gap-2 px-4 p-3 btn-primary rounded-lg">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="p-6 glass-card border border-theme rounded-xl">
          <p className="text-theme-primary whitespace-pre-wrap leading-relaxed">{output}</p>
        </div>
      </section>
</>
  )
}