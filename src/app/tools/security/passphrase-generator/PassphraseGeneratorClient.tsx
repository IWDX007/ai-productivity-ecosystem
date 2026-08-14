"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RefreshCw, MessageSquare } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface PassphraseGeneratorPageProps {
  name?: string;
  description?: string;
}

const WORDS = [
  "apple","brave","cloud","dance","eagle","frost","ghost","happy","island","jolly",
  "knight","lemon","magic","noble","ocean","peace","quest","river","stone","tiger",
  "uncle","violet","water","xenon","yacht","zebra","amber","bronze","copper","diamond",
  "emerald","forest","garden","harbor","ivory","jasmine","koala","lotus","meadow","nebula",
  "orange","piano","quartz","rainbow","silver","thunder","umbrella","valley","wizard","yellow",
  "arrow","beacon","castle","dragon","engine","flame","galaxy","horizon","iceberg","jungle",
  "kernel","laser","mystic","nova","onyx","phoenix","quiver","ranger","spirit","temple"
]

export default function PassphraseGeneratorPage({ name, description }: PassphraseGeneratorPageProps) {
  const [wordCount, setWordCount] = useState(5)
  const [separator, setSeparator] = useState("-")
  const [capitalize, setCapitalize] = useState(true)
  const [addNumber, setAddNumber] = useState(true)
  const [count, setCount] = useState(5)
  const [phrases, setPhrases] = useState<string[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = () => {
    const results: string[] = []
    for (let p = 0; p < count; p++) {
      const words: string[] = []
      const array = new Uint32Array(wordCount)
      crypto.getRandomValues(array)
      for (let i = 0; i < wordCount; i++) {
        let word = WORDS[array[i] % WORDS.length]
        if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1)
        words.push(word)
      }
      let passphrase = words.join(separator)
      if (addNumber) {
        const nArray = new Uint32Array(1)
        crypto.getRandomValues(nArray)
        passphrase += separator + (nArray[0] % 1000)
      }
      results.push(passphrase)
    }
    setPhrases(results)
  }

  useMemo(() => generate(), [wordCount, separator, capitalize, addNumber, count])

  const handleCopy = async (idx: number, str: string) => {
    await navigator.clipboard.writeText(str)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Passphrase Generator" description="Generate memorable but strong passphrases. Multiple random words combined - easier to remember than random passwords." keywords="passphrase generator, free online tool, passphrase-generator, security tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Security", href: "/tools/security" },
          { label: "Passphrase Generator" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
            Security Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Passphrase <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Generate memorable but strong passphrases. Multiple random words 
            combined - easier to remember than random passwords.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-theme-primary font-semibold mb-6">
            <MessageSquare className="w-5 h-5 text-red-400" />
            <span>Options</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Words: {wordCount}</label>
              <input type="range" min="3" max="10" value={wordCount} onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full accent-red-500" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Count: {count}</label>
              <input type="range" min="1" max="20" value={count} onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full accent-red-500" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Separator</label>
              <select value={separator} onChange={(e) => setSeparator(e.target.value)}
                className="w-full px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-red-500">
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Dot (.)</option>
                <option value=" ">Space ( )</option>
                <option value="">None</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-theme-secondary border border-theme cursor-pointer">
                <input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)}
                  className="w-4 h-4 accent-red-500" />
                <span className="text-theme-primary text-sm">Capitalize Words</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg bg-theme-secondary border border-theme cursor-pointer">
                <input type="checkbox" checked={addNumber} onChange={(e) => setAddNumber(e.target.checked)}
                  className="w-4 h-4 accent-red-500" />
                <span className="text-theme-primary text-sm">Add Number</span>
              </label>
            </div>
          </div>

          <button onClick={generate} className="w-full mb-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2">
            <RefreshCw className="w-5 h-5" /> Generate Passphrases
          </button>

          <div className="space-y-2">
            {phrases.map((phrase, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-theme-secondary border border-theme">
                <div className="flex-1 font-mono text-sm text-theme-primary break-all">{phrase}</div>
                <button onClick={() => handleCopy(idx, phrase)} className="text-theme-muted hover:text-red-400 transition flex-shrink-0">
                  {copiedIdx === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}