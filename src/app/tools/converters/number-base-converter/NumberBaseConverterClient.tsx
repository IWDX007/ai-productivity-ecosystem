"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Binary } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
const BASES = [
  { key: "binary", name: "Binary", base: 2, symbol: "Base 2" },
  { key: "octal", name: "Octal", base: 8, symbol: "Base 8" },
  { key: "decimal", name: "Decimal", base: 10, symbol: "Base 10" },
  { key: "hex", name: "Hexadecimal", base: 16, symbol: "Base 16" },
  { key: "base32", name: "Base 32", base: 32, symbol: "Base 32" },
  { key: "base36", name: "Base 36", base: 36, symbol: "Base 36" },
]

export default function NumberBaseConverterPage() {
  const [value, setValue] = useState("255")
  const [fromBase, setFromBase] = useState<string>("decimal")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [error, setError] = useState<string>("")

  const conversions = useMemo(() => {
    try {
      setError("")
      const baseInfo = BASES.find(b => b.key === fromBase)
      if (!baseInfo) return []
      const cleanValue = value.trim()
      if (!cleanValue) return BASES.map(b => ({ ...b, value: "0" }))
      const decimal = parseInt(cleanValue, baseInfo.base)
      if (isNaN(decimal)) {
        setError(`Invalid ${baseInfo.name} number`)
        return []
      }
      return BASES.map(b => ({
        ...b,
        value: decimal.toString(b.base).toUpperCase(),
      }))
    } catch (e) {
      setError("Invalid input")
      return []
    }
  }, [value, fromBase])

  const handleCopy = async (key: string, val: string) => {
    await navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("255"); setFromBase("decimal") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Number Base Converter" description="Convert numbers between Binary, Octal, Decimal, Hexadecimal and more. Perfect for programmers and computer science students." keywords="number base converter, free online tool, number-base-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Number Base Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Number Base <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert numbers between Binary, Octal, Decimal, Hexadecimal and more.
            Perfect for programmers and computer science students.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Binary className="w-5 h-5 text-purple-400" />
              <span>Enter Number</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Value</label>
              <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg font-mono focus:outline-none focus:border-purple-500 transition"
                placeholder="Enter number" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">From Base</label>
              <select value={fromBase} onChange={(e) => setFromBase(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition">
                {BASES.map(b => (
                  <option key={b.key} value={b.key}>{b.name} ({b.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="text-sm text-theme-muted mb-3">All Conversions:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map(({ key, name, symbol, value: cv }) => (
              <div key={key} className={`p-4 rounded-lg border transition ${key === fromBase ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, cv)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg font-mono break-all">{cv}</div>
                <div className="text-xs text-theme-muted mt-1">{symbol}</div>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}