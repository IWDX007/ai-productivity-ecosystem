"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Type } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface RomanNumeralConverterPageProps {
  name?: string;
  description?: string;
}

const ROMAN_MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
]

function numberToRoman(num: number): string {
  if (num <= 0 || num > 3999) return ""
  let result = ""
  for (const [val, sym] of ROMAN_MAP) {
    while (num >= val) {
      result += sym
      num -= val
    }
  }
  return result
}

function romanToNumber(roman: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let result = 0
  const upper = roman.toUpperCase()
  for (let i = 0; i < upper.length; i++) {
    const curr = map[upper[i]]
    const next = map[upper[i + 1]]
    if (!curr) return NaN
    if (next && curr < next) {
      result += next - curr
      i++
    } else {
      result += curr
    }
  }
  return result
}

export default function RomanNumeralConverterPage({ name, description }: RomanNumeralConverterPageProps) {
  const [mode, setMode] = useState<"toRoman" | "toNumber">("toRoman")
  const [input, setInput] = useState("2024")
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (mode === "toRoman") {
      const num = parseInt(input)
      if (isNaN(num) || num <= 0 || num > 3999) return "Enter number 1-3999"
      return numberToRoman(num)
    } else {
      const num = romanToNumber(input)
      if (isNaN(num) || num === 0) return "Invalid Roman numeral"
      return num.toString()
    }
  }, [input, mode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => { setInput(mode === "toRoman" ? "2024" : "MMXXIV") }

  const handleModeSwitch = (newMode: "toRoman" | "toNumber") => {
    setMode(newMode)
    setInput(newMode === "toRoman" ? "2024" : "MMXXIV")
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Roman Numeral Converter" description="Convert between Roman numerals (I, V, X, L, C, D, M) and regular numbers. Supports numbers from 1 to 3999." keywords="roman numeral converter, free online tool, roman-numeral-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Roman Numeral Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Roman Numeral <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert between Roman numerals (I, V, X, L, C, D, M) and regular numbers.
            Supports numbers from 1 to 3999.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Type className="w-5 h-5 text-purple-400" />
              <span>Conversion Mode</span>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleModeSwitch("toRoman")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${mode === "toRoman" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}
            >
              Number to Roman
            </button>
            <button
              onClick={() => handleModeSwitch("toNumber")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${mode === "toNumber" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}
            >
              Roman to Number
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">
              {mode === "toRoman" ? "Enter Number (1-3999)" : "Enter Roman Numeral"}
            </label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-2xl font-mono focus:outline-none focus:border-purple-500 transition"
              placeholder={mode === "toRoman" ? "e.g., 2024" : "e.g., MMXXIV"} />
          </div>

          <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-theme-muted">Result:</span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-purple-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-purple-400 font-bold text-4xl font-mono break-all">{result}</div>
          </div>
        </div>
</div>
    </div>
  )
}