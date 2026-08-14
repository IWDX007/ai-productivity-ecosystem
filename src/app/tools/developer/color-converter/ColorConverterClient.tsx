"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, AlertCircle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
export default function ColorConverterPage() {
  const [input, setInput] = useState("#DC2626")
  const [copied, setCopied] = useState<string | null>(null)

  // Use useMemo to prevent infinite re-renders
  const result = useMemo(() => {
    const val = input.trim()
    let r = 0, g = 0, b = 0
    let error: string | null = null
    try {
      if (val.startsWith("#")) {
        const c = val.replace("#", "")
        const full = c.length === 3 ? c.split("").map(x => x + x).join("") : c
        if (full.length !== 6) throw new Error("Invalid HEX")
        if (!/^[0-9a-f]{6}$/i.test(full)) throw new Error("Invalid HEX characters")
        r = parseInt(full.slice(0, 2), 16)
        g = parseInt(full.slice(2, 4), 16)
        b = parseInt(full.slice(4, 6), 16)
      } else if (val.toLowerCase().startsWith("rgb")) {
        const m = val.match(/(\d+),\s*(\d+),\s*(\d+)/)
        if (!m) throw new Error("Invalid RGB")
        r = +m[1]; g = +m[2]; b = +m[3]
        if (r > 255 || g > 255 || b > 255) throw new Error("RGB values must be 0-255")
      } else if (val.toLowerCase().startsWith("hsl")) {
        const m = val.match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/)
        if (!m) throw new Error("Invalid HSL")
        const h = +m[1] / 360, s = +m[2] / 100, l = +m[3] / 100
        if (s === 0) { r = g = b = Math.round(l * 255) }
        else {
          const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1; if (t > 1) t -= 1
            if (t < 1/6) return p + (q - p) * 6 * t
            if (t < 1/2) return q
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
            return p
          }
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s
          const p = 2 * l - q
          r = Math.round(hue2rgb(p, q, h + 1/3) * 255)
          g = Math.round(hue2rgb(p, q, h) * 255)
          b = Math.round(hue2rgb(p, q, h - 1/3) * 255)
        }
      } else {
        throw new Error("Unknown format. Use HEX, RGB or HSL")
      }
    } catch (e: any) {
      error = e.message
      return { rgb: null, hex: "", hsl: { h: 0, s: 0, l: 0 }, error }
    }

    const hex = "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase()

    // Calculate HSL
    const rn = r / 255, gn = g / 255, bn = b / 255
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
    let h = 0, s = 0
    const l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
        case gn: h = ((bn - rn) / d + 2) / 6; break
        case bn: h = ((rn - gn) / d + 4) / 6; break
      }
    }
    const hsl = { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }

    return { rgb: { r, g, b }, hex, hsl, error: null }
  }, [input])

  const copy = async (val: string, label: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const formats = result.rgb ? [
    { label: "HEX", value: result.hex },
    { label: "RGB", value: `rgb(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b})` },
    { label: "HSL", value: `hsl(${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%)` },
    { label: "RGBA", value: `rgba(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b}, 1)` },
    { label: "HSLA", value: `hsla(${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%, 1)` },
  ] : []

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Color Converter" description="Convert between HEX, RGB, HSL and other color formats." keywords="color converter, free online tool, color-converter, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Color Converter" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Color <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary text-lg">Convert between HEX, RGB, HSL and other color formats.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <label className="text-theme-primary font-medium block mb-2">Enter Color (HEX, RGB, or HSL)</label>
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder="#DC2626 or rgb(220, 38, 38) or hsl(0, 72%, 51%)"
            className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono focus:outline-none focus:border-crimson-500" />
          {result.error && (
            <div className="mt-3 flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle size={16} /> {result.error}
            </div>
          )}
        </div>

        {result.rgb && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="rounded-xl h-64 shadow-2xl"
                style={{ backgroundColor: result.hex }} />
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-theme-primary font-semibold mb-4">All Formats</h3>
              <div className="space-y-3">
                {formats.map(f => (
                  <div key={f.label} className="bg-theme-secondary rounded-xl p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-theme-muted text-xs font-medium">{f.label}</span>
                      <button onClick={() => copy(f.value, f.label)}
                        className="text-theme-muted hover:text-crimson-500">
                        {copied === f.label ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="text-theme-primary font-mono text-sm">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
</div>
  )
}