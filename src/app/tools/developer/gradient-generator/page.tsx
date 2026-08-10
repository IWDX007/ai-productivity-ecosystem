"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, Plus, X } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function GradientGeneratorPage() {
  const [colors, setColors] = useState(["#DC2626", "#EC4899"])
  const [direction, setDirection] = useState("135deg")
  const [type, setType] = useState<"linear" | "radial">("linear")
  const [copied, setCopied] = useState<string | null>(null)

  const gradient = type === "linear"
    ? `linear-gradient(${direction}, ${colors.join(", ")})`
    : `radial-gradient(circle, ${colors.join(", ")})`

  const css = `background: ${gradient};`
  const tailwind = colors.length === 2
    ? `bg-gradient-to-br from-[${colors[0]}] to-[${colors[1]}]`
    : "// Use custom CSS for 3+ colors"

  const copy = async (val: string, label: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const addColor = () => setColors([...colors, "#3B82F6"])
  const removeColor = (i: number) => setColors(colors.filter((_, idx) => idx !== i))
  const updateColor = (i: number, val: string) => {
    const nc = [...colors]; nc[i] = val; setColors(nc)
  }

  const directions = ["0deg","45deg","90deg","135deg","180deg","225deg","270deg","315deg"]

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="CSS Gradient Generator" description="Create beautiful CSS gradients with live preview." keywords="css gradient generator, free online tool, gradient-generator, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Gradient Generator" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            CSS Gradient <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary text-lg">Create beautiful CSS gradients with live preview.</p>
        </div>

        {/* Preview */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="rounded-xl h-64 shadow-2xl" style={{ background: gradient }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Gradient Settings</h3>

            {/* Type */}
            <div className="mb-4">
              <label className="text-theme-secondary text-sm block mb-2">Type</label>
              <div className="flex bg-theme-secondary rounded-xl p-1">
                {(["linear", "radial"] as const).map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium capitalize transition-all ${type === t ? "gradient-crimson text-white" : "text-theme-secondary hover:text-theme-primary"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Direction */}
            {type === "linear" && (
              <div className="mb-4">
                <label className="text-theme-secondary text-sm block mb-2">Direction: {direction}</label>
                <div className="grid grid-cols-4 gap-2">
                  {directions.map(d => (
                    <button key={d} onClick={() => setDirection(d)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${direction === d ? "gradient-crimson text-white" : "bg-theme-secondary text-theme-secondary hover:text-theme-primary"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-theme-secondary text-sm">Colors ({colors.length})</label>
                <button onClick={addColor} disabled={colors.length >= 5}
                  className="text-crimson-500 disabled:text-theme-muted hover:opacity-80 flex items-center gap-1 text-sm">
                  <Plus size={14} /> Add Color
                </button>
              </div>
              <div className="space-y-2">
                {colors.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="color" value={c} onChange={e => updateColor(i, e.target.value)}
                      className="w-14 h-10 rounded-lg cursor-pointer bg-transparent" />
                    <input value={c} onChange={e => updateColor(i, e.target.value)}
                      className="flex-1 px-3 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary font-mono text-sm focus:outline-none focus:border-crimson-500" />
                    {colors.length > 2 && (
                      <button onClick={() => removeColor(i)}
                        className="text-red-500 hover:opacity-80">
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Generated Code</h3>
            <div className="space-y-4">
              <div className="bg-theme-secondary rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-theme-muted text-xs font-medium">CSS</span>
                  <button onClick={() => copy(css, "css")}
                    className="text-theme-muted hover:text-crimson-500">
                    {copied === "css" ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <code className="text-theme-primary font-mono text-sm break-all">{css}</code>
              </div>

              <div className="bg-theme-secondary rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-theme-muted text-xs font-medium">Tailwind CSS</span>
                  <button onClick={() => copy(tailwind, "tw")}
                    className="text-theme-muted hover:text-crimson-500">
                    {copied === "tw" ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <code className="text-theme-primary font-mono text-sm break-all">{tailwind}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <SEOSections toolSlug="gradient-generator" toolName="Gradient Generator" category="Developer" />
    </div>
  )
}