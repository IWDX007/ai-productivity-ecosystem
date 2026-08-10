"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

export default function ColorPalettePage() {
  const [baseColor, setBaseColor] = useState("#DC2626")
  const [copied, setCopied] = useState<string | null>(null)

  const hexToRGB = (hex: string) => {
    const c = hex.replace("#", "")
    return { r: parseInt(c.slice(0, 2), 16), g: parseInt(c.slice(2, 4), 16), b: parseInt(c.slice(4, 6), 16) }
  }
  const rgbToHex = (r: number, g: number, b: number) => "#" + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("").toUpperCase()
  const rgbToHSL = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0; const l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
  }
  const hslToRGB = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100
    let r, g, b
    if (s === 0) r = g = b = l
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
      r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3)
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
  }

  const rgb = hexToRGB(baseColor)
  const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b)

  const shades = [
    { name: "50", l: 95 }, { name: "100", l: 90 }, { name: "200", l: 80 },
    { name: "300", l: 70 }, { name: "400", l: 60 }, { name: "500", l: 50 },
    { name: "600", l: 40 }, { name: "700", l: 30 }, { name: "800", l: 20 },
    { name: "900", l: 10 }
  ].map(({ name, l }) => {
    const { r, g, b } = hslToRGB(hsl.h, hsl.s, l)
    return { name, hex: rgbToHex(r, g, b) }
  })

  const complementary = (() => {
    const c = hslToRGB((hsl.h + 180) % 360, hsl.s, hsl.l)
    return rgbToHex(c.r, c.g, c.b)
  })()
  const triadic = [(hsl.h + 120) % 360, (hsl.h + 240) % 360].map(h => {
    const c = hslToRGB(h, hsl.s, hsl.l); return rgbToHex(c.r, c.g, c.b)
  })
  const analogous = [(hsl.h + 30) % 360, (hsl.h - 30 + 360) % 360].map(h => {
    const c = hslToRGB(h, hsl.s, hsl.l); return rgbToHex(c.r, c.g, c.b)
  })

  const copy = async (val: string) => {
    await navigator.clipboard.writeText(val)
    setCopied(val)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Color Palette Generator" description="Generate shades, tints and complementary color schemes." keywords="color palette generator, free online tool, color-palette, developer tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={[
          { label: "Tools", href: "/tools" },
          { label: "Developer", href: "/tools/developer" },
          { label: "Color Palette" }
        ]} />
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-3">
            Color Palette <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-theme-secondary text-lg">Generate shades, tints and complementary color schemes.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-theme-primary font-medium">Base Color:</label>
            <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)}
              className="w-16 h-12 rounded-lg cursor-pointer bg-transparent" />
            <input value={baseColor} onChange={e => setBaseColor(e.target.value)}
              className="px-4 py-2 bg-theme-secondary border border-theme rounded-xl text-theme-primary font-mono focus:outline-none focus:border-crimson-500" />
          </div>
        </div>

        {/* Shades */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="text-theme-primary font-semibold mb-4">Shades (50 - 900)</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {shades.map(s => (
              <button key={s.name} onClick={() => copy(s.hex)} className="group">
                <div className="rounded-lg h-20 shadow-md hover:scale-105 transition-transform"
                  style={{ backgroundColor: s.hex }} />
                <div className="mt-1 text-center">
                  <div className="text-theme-primary text-xs font-medium">{s.name}</div>
                  <div className="text-theme-muted text-[10px] font-mono">
                    {copied === s.hex ? <Check size={10} className="inline text-green-500" /> : s.hex}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Complementary */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Complementary</h3>
            <div className="flex gap-2">
              <button onClick={() => copy(baseColor)} className="flex-1">
                <div className="rounded-lg h-24" style={{ backgroundColor: baseColor }} />
                <div className="text-theme-muted text-xs font-mono mt-1">{baseColor}</div>
              </button>
              <button onClick={() => copy(complementary)} className="flex-1">
                <div className="rounded-lg h-24" style={{ backgroundColor: complementary }} />
                <div className="text-theme-muted text-xs font-mono mt-1">{complementary}</div>
              </button>
            </div>
          </div>

          {/* Triadic */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Triadic</h3>
            <div className="flex gap-2">
              {[baseColor, ...triadic].map(c => (
                <button key={c} onClick={() => copy(c)} className="flex-1">
                  <div className="rounded-lg h-24" style={{ backgroundColor: c }} />
                  <div className="text-theme-muted text-xs font-mono mt-1">{c}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Analogous */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-theme-primary font-semibold mb-4">Analogous</h3>
            <div className="flex gap-2">
              {[analogous[1], baseColor, analogous[0]].map(c => (
                <button key={c} onClick={() => copy(c)} className="flex-1">
                  <div className="rounded-lg h-24" style={{ backgroundColor: c }} />
                  <div className="text-theme-muted text-xs font-mono mt-1">{c}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    
      <SEOSections toolSlug="color-palette" toolName="Color Palette Generator" category="Developer" />
    </div>
  )
}