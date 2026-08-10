"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, HardDrive } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

const UNITS: Record<string, { name: string; symbol: string; toBytes: number }> = {
  bit:       { name: "Bit",       symbol: "b",  toBytes: 0.125 },
  byte:      { name: "Byte",      symbol: "B",  toBytes: 1 },
  kilobit:   { name: "Kilobit",   symbol: "Kb", toBytes: 125 },
  kilobyte:  { name: "Kilobyte",  symbol: "KB", toBytes: 1024 },
  megabit:   { name: "Megabit",   symbol: "Mb", toBytes: 125000 },
  megabyte:  { name: "Megabyte",  symbol: "MB", toBytes: 1048576 },
  gigabit:   { name: "Gigabit",   symbol: "Gb", toBytes: 1.25e8 },
  gigabyte:  { name: "Gigabyte",  symbol: "GB", toBytes: 1073741824 },
  terabit:   { name: "Terabit",   symbol: "Tb", toBytes: 1.25e11 },
  terabyte:  { name: "Terabyte",  symbol: "TB", toBytes: 1.0995e12 },
  petabyte:  { name: "Petabyte",  symbol: "PB", toBytes: 1.1259e15 },
  exabyte:   { name: "Exabyte",   symbol: "EB", toBytes: 1.1529e18 },
}

function formatNumber(num: number): string {
  if (num === 0) return "0"
  const abs = Math.abs(num)
  if (abs < 0.0001 || abs > 1e15) return num.toExponential(6)
  if (abs < 1) return num.toPrecision(6).replace(/\.?0+$/, "")
  return num.toLocaleString(undefined, { maximumFractionDigits: 10 })
}

export default function DataStorageConverterPage() {
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("gigabyte")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const fromFactor = UNITS[fromUnit].toBytes
    const valueInBytes = numericValue * fromFactor
    return Object.entries(UNITS).map(([key, unit]) => ({
      key, name: unit.name, symbol: unit.symbol,
      value: valueInBytes / unit.toBytes,
    }))
  }, [numericValue, fromUnit])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("1"); setFromUnit("gigabyte") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Data Storage Converter" description="Convert between bytes, KB, MB, GB, TB and more data units. Perfect for file sizes, bandwidth and storage calculations." keywords="data storage converter, free online tool, data-storage-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Data Storage Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Data Storage <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between bytes, KB, MB, GB, TB and more data units.
            Perfect for file sizes, bandwidth and storage calculations.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <HardDrive className="w-5 h-5 text-purple-400" />
              <span>Enter Data Size</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="text-sm text-theme-muted mb-2 block">Value</label>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="Enter number" />
            </div>
            <div>
              <label className="text-sm text-theme-muted mb-2 block">From Unit</label>
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg focus:outline-none focus:border-purple-500 transition">
                {Object.entries(UNITS).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name} ({unit.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-theme-muted mb-3">All Conversions:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map(({ key, name, symbol, value: convertedValue }) => (
              <div key={key} className={`p-4 rounded-lg border transition ${key === fromUnit ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, convertedValue)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg break-all">{formatNumber(convertedValue)}</div>
                <div className="text-xs text-theme-muted mt-1">{symbol}</div>
              </div>
            ))}
          </div>
        </div>

        <SEOSections toolSlug="data-storage-converter" toolName="Data Storage Converter" category="Converter" />
      </div>
    </div>
  )
}