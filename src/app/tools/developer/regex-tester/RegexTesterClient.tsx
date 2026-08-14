"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { CheckCircle, XCircle, Info } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testText, setTestText] = useState("")
  const [matches, setMatches] = useState<{ match: string; index: number; groups: string[] }[]>([])
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tested, setTested] = useState(false)

  const test = () => {
    if (!pattern) { setError("Enter a regex pattern"); return }
    try {
      const regex = new RegExp(pattern, flags)
      const found: { match: string; index: number; groups: string[] }[] = []
      let m
      if (flags.includes("g")) {
        while ((m = regex.exec(testText)) !== null) {
          found.push({ match: m[0], index: m.index, groups: m.slice(1) })
          if (m[0] === "") regex.lastIndex++
        }
      } else {
        m = regex.exec(testText)
        if (m) found.push({ match: m[0], index: m.index, groups: m.slice(1) })
      }
      setMatches(found)
      setIsValid(true)
      setError(null)
      setTested(true)
    } catch (e: any) {
      setIsValid(false)
      setError(e.message)
      setMatches([])
      setTested(true)
    }
  }

  const highlightText = () => {
    if (!testText || matches.length === 0) return testText
    let result = testText
    let offset = 0
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index)
    sortedMatches.forEach(m => {
      const start = m.index + offset
      const end = start + m.match.length
      const highlight = `<mark class="bg-yellow-300 dark:bg-yellow-600 text-black dark:text-white rounded px-0.5">${result.slice(start, end)}</mark>`
      result = result.slice(0, start) + highlight + result.slice(end)
      offset += highlight.length - m.match.length
    })
    return result
  }

  const allFlags = ["g", "i", "m", "s", "u"]
  const samples = [
    { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", text: "Contact us at hello@example.com or support@test.org for help." },
    { name: "URL", pattern: "https?:\\/\\/[^\\s]+", text: "Visit https://google.com or http://example.org for more info." },
    { name: "Phone", pattern: "\\+?[1-9]\\d{9,14}", text: "Call us at +923001234567 or +12345678901 anytime." },
    { name: "IP Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", text: "Server IPs: 192.168.1.1 and 10.0.0.254 are configured." },
  ]

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Regex Tester" description="Test and debug regular expressions with live match highlighting." keywords="regex tester, free online tool, regex-tester, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Regex Tester" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Regex <span className="gradient-text">Tester</span>
          </h1>
          <p className="text-theme-secondary text-lg">Test and debug regular expressions with live match highlighting.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          {/* Pattern Input */}
          <div className="mb-4">
            <label className="text-theme-primary font-medium block mb-2">Regular Expression Pattern</label>
            <div className="flex gap-2 items-center">
              <span className="text-theme-muted font-mono text-xl">/</span>
              <input value={pattern} onChange={e => { setPattern(e.target.value); setTested(false) }}
                placeholder="[a-z]+" className="flex-1 px-4 py-3 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono focus:outline-none focus:border-crimson-500" />
              <span className="text-theme-muted font-mono text-xl">/</span>
              <input value={flags} onChange={e => setFlags(e.target.value)} maxLength={6}
                className="w-20 px-3 py-3 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono focus:outline-none focus:border-crimson-500 text-center" />
            </div>
            {/* Flag toggles */}
            <div className="flex gap-2 mt-3">
              <span className="text-theme-muted text-sm">Flags:</span>
              {allFlags.map(f => (
                <button key={f} onClick={() => setFlags(prev => prev.includes(f) ? prev.replace(f, "") : prev + f)}
                  className={`w-8 h-8 rounded-lg font-mono text-sm font-bold transition-all ${flags.includes(f) ? "gradient-crimson text-white" : "bg-theme-secondary text-theme-muted hover:text-theme-primary"}`}>
                  {f}
                </button>
              ))}
              <span className="text-theme-muted text-xs ml-2 self-center">g=global, i=ignore case, m=multiline, s=dotAll, u=unicode</span>
            </div>
          </div>

          {/* Test Text */}
          <div className="mb-4">
            <label className="text-theme-primary font-medium block mb-2">Test String</label>
            <textarea value={testText} onChange={e => { setTestText(e.target.value); setTested(false) }}
              placeholder="Enter text to test against your regex..."
              rows={5} className="w-full p-4 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono text-sm resize-none focus:outline-none focus:border-crimson-500" />
          </div>

          {/* Sample patterns */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-theme-muted text-sm self-center">Samples:</span>
            {samples.map(s => (
              <button key={s.name} onClick={() => { setPattern(s.pattern); setTestText(s.text); setTested(false) }}
                className="px-3 py-1.5 bg-theme-secondary text-theme-secondary hover:text-theme-primary rounded-lg text-sm transition-all">
                {s.name}
              </button>
            ))}
          </div>

          <button onClick={test} className="btn-primary px-8 py-2.5 rounded-xl font-medium">
            Test Regex
          </button>

          {/* Results */}
          {tested && (
            <div className="mt-6">
              {!isValid ? (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                  <XCircle size={18} className="text-red-500" />
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              ) : (
                <>
                  <div className={`p-4 rounded-xl flex items-center gap-3 mb-4 ${matches.length > 0 ? "bg-green-500/10 border border-green-500/30" : "bg-yellow-500/10 border border-yellow-500/30"}`}>
                    {matches.length > 0
                      ? <><CheckCircle size={18} className="text-green-500" /><p className="text-green-500 text-sm font-medium">{matches.length} match{matches.length !== 1 ? "es" : ""} found!</p></>
                      : <><Info size={18} className="text-yellow-500" /><p className="text-yellow-500 text-sm font-medium">No matches found</p></>}
                  </div>

                  {matches.length > 0 && (
                    <>
                      {/* Highlighted text */}
                      <div className="mb-4">
                        <label className="text-theme-primary font-medium block mb-2">Highlighted Matches</label>
                        <div className="p-4 bg-theme-secondary border border-theme rounded-xl font-mono text-sm text-theme-primary whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ __html: highlightText() }} />
                      </div>

                      {/* Match list */}
                      <div>
                        <label className="text-theme-primary font-medium block mb-2">Match Details</label>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {matches.map((m, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-theme-secondary rounded-lg">
                              <span className="text-crimson-500 font-mono text-xs w-6">#{i + 1}</span>
                              <span className="font-mono text-sm bg-yellow-300/20 px-2 py-0.5 rounded text-theme-primary">{m.match}</span>
                              <span className="text-theme-muted text-xs">at index {m.index}</span>
                              {m.groups.length > 0 && (
                                <span className="text-theme-muted text-xs">groups: [{m.groups.join(", ")}]</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
</div>
  )
}