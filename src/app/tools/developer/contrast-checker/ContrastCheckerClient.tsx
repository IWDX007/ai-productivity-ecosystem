"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function ContrastCheckerPage() {
  const [fg, setFg] = useState("#FFFFFF")
  const [bg, setBg] = useState("#DC2626")

  const getLuminance = (hex: string) => {
    const c = hex.replace("#", "")
    const [r, g, b] = [c.slice(0, 2), c.slice(2, 4), c.slice(4, 6)].map(v => {
      const n = parseInt(v, 16) / 255
      return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const l1 = getLuminance(fg), l2 = getLuminance(bg)
  const ratio = Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100

  const results = [
    { label: "AA Large Text", req: 3, passed: ratio >= 3 },
    { label: "AA Normal Text", req: 4.5, passed: ratio >= 4.5 },
    { label: "AAA Large Text", req: 4.5, passed: ratio >= 4.5 },
    { label: "AAA Normal Text", req: 7, passed: ratio >= 7 },
  ]

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="WCAG Contrast Checker" description="Check color contrast ratio for WCAG accessibility compliance." keywords="wcag contrast checker, free online tool, contrast-checker, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Contrast Checker" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            WCAG Contrast <span className="gradient-text">Checker</span>
          </h1>
          <p className="text-theme-secondary text-lg">Check color contrast ratio for WCAG accessibility compliance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Choose Colors</h3>
            <div className="space-y-4">
              <div>
                <label className="text-theme-secondary text-sm block mb-2">Foreground (Text)</label>
                <div className="flex gap-2">
                  <input type="color" value={fg} onChange={e => setFg(e.target.value)}
                    className="w-14 h-12 rounded-lg cursor-pointer bg-transparent" />
                  <input value={fg} onChange={e => setFg(e.target.value)}
                    className="flex-1 px-4 py-2 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono focus:outline-none focus:border-crimson-500" />
                </div>
              </div>
              <div>
                <label className="text-theme-secondary text-sm block mb-2">Background</label>
                <div className="flex gap-2">
                  <input type="color" value={bg} onChange={e => setBg(e.target.value)}
                    className="w-14 h-12 rounded-lg cursor-pointer bg-transparent" />
                  <input value={bg} onChange={e => setBg(e.target.value)}
                    className="flex-1 px-4 py-2 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono focus:outline-none focus:border-crimson-500" />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="mt-6 rounded-xl p-6 text-center" style={{ backgroundColor: bg, color: fg }}>
              <p className="text-3xl font-bold mb-2">Large Text</p>
              <p className="text-base">Normal size sample text</p>
              <p className="text-sm mt-2">Small text sample</p>
            </div>
          </div>

          {/* Results */}
          <div className="glass-card rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold gradient-text mb-2">{ratio}:1</div>
              <p className="text-theme-muted text-sm">Contrast Ratio</p>
            </div>

            <div className="space-y-3">
              {results.map(r => (
                <div key={r.label} className={`p-4 rounded-xl border ${r.passed ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {r.passed
                        ? <CheckCircle size={18} className="text-green-500" />
                        : <XCircle size={18} className="text-red-500" />}
                      <span className="text-theme-primary font-medium">{r.label}</span>
                    </div>
                    <span className={`text-sm font-semibold ${r.passed ? "text-green-500" : "text-red-500"}`}>
                      {r.passed ? "PASS" : "FAIL"} (need {r.req}:1)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
</div>
  )
}