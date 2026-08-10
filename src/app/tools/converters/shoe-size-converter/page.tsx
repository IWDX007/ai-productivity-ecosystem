"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { Copy, Check, RotateCcw, Footprints } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

// Men's shoe size conversion table (approximate)
const SIZE_TABLE = [
  { us: 6,   uk: 5.5,  eu: 39,   cm: 24.4 },
  { us: 6.5, uk: 6,    eu: 39.5, cm: 24.8 },
  { us: 7,   uk: 6.5,  eu: 40,   cm: 25.2 },
  { us: 7.5, uk: 7,    eu: 40.5, cm: 25.7 },
  { us: 8,   uk: 7.5,  eu: 41,   cm: 26.0 },
  { us: 8.5, uk: 8,    eu: 42,   cm: 26.5 },
  { us: 9,   uk: 8.5,  eu: 42.5, cm: 27.0 },
  { us: 9.5, uk: 9,    eu: 43,   cm: 27.5 },
  { us: 10,  uk: 9.5,  eu: 44,   cm: 28.0 },
  { us: 10.5,uk: 10,   eu: 44.5, cm: 28.5 },
  { us: 11,  uk: 10.5, eu: 45,   cm: 29.0 },
  { us: 11.5,uk: 11,   eu: 45.5, cm: 29.5 },
  { us: 12,  uk: 11.5, eu: 46,   cm: 30.0 },
  { us: 13,  uk: 12.5, eu: 47,   cm: 31.0 },
  { us: 14,  uk: 13.5, eu: 48,   cm: 32.0 },
]

export default function ShoeSizeConverterPage() {
  const [gender, setGender] = useState<"men" | "women">("men")
  const [value, setValue] = useState<string>("9")
  const [fromSystem, setFromSystem] = useState<"us" | "uk" | "eu" | "cm">("us")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const inputNum = parseFloat(value) || 0

  // Find the closest match
  const findMatch = () => {
    let adjustedValue = inputNum
    // Women's sizes are typically 1.5 US smaller than men's
    if (gender === "women" && fromSystem === "us") {
      adjustedValue = inputNum - 1.5
    }

    const closest = SIZE_TABLE.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev[fromSystem] - adjustedValue)
      const currDiff = Math.abs(curr[fromSystem] - adjustedValue)
      return currDiff < prevDiff ? curr : prev
    })

    return closest
  }

  const match = findMatch()
  const results = {
    us: gender === "women" ? match.us + 1.5 : match.us,
    uk: match.uk,
    eu: match.eu,
    cm: match.cm,
  }

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(val.toString())
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("9"); setFromSystem("us"); setGender("men") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Shoe Size Converter" description="Convert shoe sizes between US, UK, EU and centimeters (foot length). Perfect for online shopping and international shoe purchases." keywords="shoe size converter, free online tool, shoe-size-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Shoe Size Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Shoe Size <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert shoe sizes between US, UK, EU and centimeters (foot length).
            Perfect for online shopping and international shoe purchases.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Footprints className="w-5 h-5 text-purple-400" />
              <span>Enter Shoe Size</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            {(["men", "women"] as const).map(g => (
              <button key={g} onClick={() => setGender(g)}
                className={`flex-1 px-4 py-2 rounded-lg transition capitalize ${gender === g ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>
                {g}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Size</label>
              <input type="number" step="0.5" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="Enter size" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Size System</label>
              <select value={fromSystem} onChange={(e) => setFromSystem(e.target.value as any)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition">
                <option value="us">US Size</option>
                <option value="uk">UK Size</option>
                <option value="eu">EU Size</option>
                <option value="cm">Foot Length (cm)</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-theme-muted mb-3">All Size Conversions:</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { key: "us", name: "US Size", value: results.us, unit: "" },
              { key: "uk", name: "UK Size", value: results.uk, unit: "" },
              { key: "eu", name: "EU Size", value: results.eu, unit: "" },
              { key: "cm", name: "Foot Length", value: results.cm, unit: "cm" },
            ].map(item => (
              <div key={item.key} className={`p-4 rounded-lg border transition ${fromSystem === item.key ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{item.name}</span>
                  <button onClick={() => handleCopy(item.key, item.value)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === item.key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-2xl">{item.value} {item.unit}</div>
              </div>
            ))}
          </div>
        </div>

        <SEOSections toolSlug="shoe-size-converter" toolName="Shoe Size Converter" category="Converter" />
      </div>
    </div>
  )
}