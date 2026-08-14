"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface ColorPickerPageProps {
  name?: string;
  description?: string;
}

export default function ColorPickerPage({ name, description }: ColorPickerPageProps) {
  const [color, setColor] = useState("#DC2626")
  const [copied, setCopied] = useState<string | null>(null)

  const hexToRGB = (hex: string) => {
    const c = hex.replace("#", "")
    return { r: parseInt(c.slice(0, 2), 16), g: parseInt(c.slice(2, 4), 16), b: parseInt(c.slice(4, 6), 16) }
  }

  const rgbToHSL = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const rgb = hexToRGB(color)
  const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b)

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "RGBA", value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "HSLA", value: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)` },
  ]

  const copy = async (val: string, label: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const presets = ["#DC2626","#EC4899","#F59E0B","#10B981","#3B82F6","#8B5CF6","#000000","#FFFFFF"]

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Color Picker" description="Pick any color and get HEX, RGB, HSL values instantly." keywords="color picker, free online tool, color-picker, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Color Picker" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Color <span className="gradient-text">Picker</span>
          </h1>
          <p className="text-theme-secondary text-lg">Pick any color and get HEX, RGB, HSL values instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Preview */}
          <div className="glass-card rounded-2xl p-6">
            <div className="rounded-xl h-64 mb-4 shadow-2xl transition-all"
              style={{ backgroundColor: color }} />
            <input type="color" value={color} onChange={e => setColor(e.target.value)}
              className="w-full h-14 rounded-xl cursor-pointer bg-transparent" />
            <div className="mt-4">
              <label className="text-theme-secondary text-sm block mb-2">Or enter HEX:</label>
              <input value={color} onChange={e => setColor(e.target.value)}
                className="w-full px-4 py-2 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono focus:outline-none focus:border-crimson-500" />
            </div>
            {/* Presets */}
            <div className="mt-4">
              <label className="text-theme-secondary text-sm block mb-2">Quick Colors:</label>
              <div className="flex gap-2 flex-wrap">
                {presets.map(p => (
                  <button key={p} onClick={() => setColor(p)}
                    className="w-10 h-10 rounded-lg border-2 border-theme hover:scale-110 transition-transform"
                    style={{ backgroundColor: p }} />
                ))}
              </div>
            </div>
          </div>

          {/* Formats */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Color Values</h3>
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
      </div>
</div>
  )
}