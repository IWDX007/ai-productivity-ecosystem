"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Zap } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface PowerConverterPageProps {
  name?: string;
  description?: string;
}

const UNITS: Record<string, { name: string; symbol: string; toBase: number }> = {
  watt:       { name: "Watt",           symbol: "W",   toBase: 1 },
  kilowatt:   { name: "Kilowatt",       symbol: "kW",  toBase: 1000 },
  megawatt:   { name: "Megawatt",       symbol: "MW",  toBase: 1e6 },
  gigawatt:   { name: "Gigawatt",       symbol: "GW",  toBase: 1e9 },
  milliwatt:  { name: "Milliwatt",      symbol: "mW",  toBase: 0.001 },
  microwatt:  { name: "Microwatt",      symbol: "uW",  toBase: 1e-6 },
  horsepower: { name: "Horsepower",     symbol: "HP",  toBase: 745.7 },
  metricHp:   { name: "Metric HP",      symbol: "PS",  toBase: 735.5 },
  btuPerHr:   { name: "BTU/hour",       symbol: "BTU/h", toBase: 0.293071 },
  ftLbPerSec: { name: "ft-lb/sec",      symbol: "ft-lb/s", toBase: 1.35582 },
  calPerSec:  { name: "Cal/sec",        symbol: "cal/s", toBase: 4.184 },
  kvA:        { name: "Kilovolt-amp",   symbol: "kVA", toBase: 1000 },
}

function formatNumber(num: number): string {
  if (num === 0) return "0"
  const abs = Math.abs(num)
  if (abs < 0.0001 || abs > 1e15) return num.toExponential(6)
  if (abs < 1) return num.toPrecision(6).replace(/\.?0+$/, "")
  return num.toLocaleString(undefined, { maximumFractionDigits: 10 })
}

export default function PowerConverterPage({ name, description }: PowerConverterPageProps) {
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("kilowatt")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const numericValue = parseFloat(value) || 0

  const conversions = useMemo(() => {
    const fromFactor = (UNITS as any)[fromUnit].toBase
    const valueInBase = numericValue * fromFactor
    return Object.entries(UNITS).map(([key, unit]) => ({
      key, name: (unit as any).name, symbol: (unit as any).symbol,
      value: valueInBase / (unit as any).toBase,
    }))
  }, [numericValue, fromUnit])

  const handleCopy = async (key: string, val: number) => {
    await navigator.clipboard.writeText(formatNumber(val))
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleReset = () => { setValue("1"); setFromUnit("kilowatt") }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Power Converter" description="Convert between Watt, Kilowatt, Horsepower, BTU/h and more power units. Perfect for electrical and mechanical calculations." keywords="power converter, free online tool, power-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Power Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Power <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between Watt, Kilowatt, Horsepower, BTU/h and more power units. Perfect for electrical and mechanical calculations.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Zap className="w-5 h-5 text-purple-400" />
              <span>Enter Power</span>
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
                  <option key={key} value={key}>{(unit as any).name} ({(unit as any).symbol})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-theme-muted mb-3">All Conversions:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map(({ key, name, symbol, value: cv }) => (
              <div key={key} className={`p-4 rounded-lg border transition ${key === fromUnit ? "bg-purple-500/10 border-purple-500/30" : "bg-theme-secondary border-theme hover:border-purple-500/30"}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-theme-muted">{name}</span>
                  <button onClick={() => handleCopy(key, cv)} className="text-theme-muted hover:text-purple-400 transition">
                    {copiedKey === key ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-theme-primary font-semibold text-lg break-all">{formatNumber(cv)}</div>
                <div className="text-xs text-theme-muted mt-1">{symbol}</div>
              </div>
            ))}
          </div>
        </div>
</div>
    </div>
  )
}