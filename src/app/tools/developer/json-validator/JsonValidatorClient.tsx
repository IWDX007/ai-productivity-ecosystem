"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function JsonValidatorPage() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<{
    valid: boolean; error: string | null; lines: number; keys: number; size: number; type: string
  } | null>(null)

  const validate = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      const keys = JSON.stringify(parsed).match(/"[^"]+"\s*:/g)?.length || 0
      const type = Array.isArray(parsed) ? "Array" : typeof parsed === "object" ? "Object" : typeof parsed
      setResult({ valid: true, error: null, lines: input.split("\n").length, keys, size: input.length, type })
    } catch (e: any) {
      setResult({ valid: false, error: e.message, lines: 0, keys: 0, size: input.length, type: "Invalid" })
    }
  }

  const samples = {
    valid: `{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}`,
    invalid: `{\n  "name": "John",\n  age: 30,\n  "city": "New York"\n}`,
    array: `[\n  {"id": 1, "name": "Alice"},\n  {"id": 2, "name": "Bob"}\n]`
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="JSON Validator" description="Validate your JSON instantly. Check syntax errors with detailed reporting." keywords="json validator, free online tool, json-validator, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "JSON Validator" }
        ]} />

        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            JSON <span className="gradient-text">Validator</span>
          </h1>
          <p className="text-theme-secondary text-lg">Validate your JSON instantly. Check syntax errors with detailed reporting.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex gap-2 mb-4">
            {Object.entries(samples).map(([key, val]) => (
              <button key={key} onClick={() => { setInput(val); setResult(null) }}
                className="px-3 py-1.5 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg text-sm capitalize transition-all">
                {key} Sample
              </button>
            ))}
          </div>

          <textarea value={input} onChange={e => { setInput(e.target.value); setResult(null) }}
            placeholder='Paste your JSON here to validate...' rows={12}
            className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500 mb-4" />

          <button onClick={validate} className="btn-primary px-8 py-2.5 rounded-xl font-medium">
            Validate JSON
          </button>

          {result && (
            <div className={`mt-6 p-6 rounded-xl border ${result.valid ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
              <div className="flex items-center gap-3 mb-4">
                {result.valid
                  ? <CheckCircle size={24} className="text-green-500" />
                  : <XCircle size={24} className="text-red-500" />}
                <h3 className={`text-xl font-bold ${result.valid ? "text-green-500" : "text-red-500"}`}>
                  {result.valid ? "Valid JSON!" : "Invalid JSON!"}
                </h3>
              </div>

              {result.valid ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Type", value: result.type },
                    { label: "Lines", value: result.lines },
                    { label: "Keys", value: result.keys },
                    { label: "Size", value: `${result.size} chars` },
                  ].map(s => (
                    <div key={s.label} className="bg-theme-secondary rounded-lg p-3 text-center">
                      <div className="text-lg font-bold gradient-text">{s.value}</div>
                      <div className="text-theme-muted text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-start gap-2 mt-2">
                  <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400 text-sm font-mono">{result.error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
</div>
  )
}