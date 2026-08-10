"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Type } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"

const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
              "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
              "seventeen", "eighteen", "nineteen"]
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

function convertBelow1000(n: number): string {
  if (n === 0) return ""
  if (n < 20) return ones[n]
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? "-" + ones[n % 10] : "")
  return ones[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + convertBelow1000(n % 100) : "")
}

function numberToWords(num: number): string {
  if (num === 0) return "zero"
  if (num < 0) return "negative " + numberToWords(-num)
  if (num > 999999999999) return "Number too large"

  const scales = ["", "thousand", "million", "billion"]
  let result = ""
  let scaleIdx = 0

  while (num > 0) {
    const chunk = num % 1000
    if (chunk > 0) {
      const chunkStr = convertBelow1000(chunk)
      result = chunkStr + (scales[scaleIdx] ? " " + scales[scaleIdx] : "") + (result ? " " + result : "")
    }
    num = Math.floor(num / 1000)
    scaleIdx++
  }

  return result.trim()
}

export default function NumberToWordsConverterPage() {
  const [number, setNumber] = useState("1234")
  const [copied, setCopied] = useState(false)

  const words = useMemo(() => {
    const num = parseFloat(number)
    if (isNaN(num)) return "Invalid number"

    const isNegative = num < 0
    const absNum = Math.abs(num)
    const intPart = Math.floor(absNum)
    const decPart = Math.round((absNum - intPart) * 100)

    let result = numberToWords(intPart)
    if (isNegative) result = "negative " + result
    if (decPart > 0) {
      result += " and " + numberToWords(decPart) + " cents"
    }

    return result.charAt(0).toUpperCase() + result.slice(1)
  }, [number])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(words)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Number to Words" description="Convert any number to its word representation. Perfect for writing checks, legal documents and formal writing." keywords="number to words, free online tool, number-to-words-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Number to Words" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Number to <span className="gradient-text">Words</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert any number to its word representation. Perfect for writing 
            checks, legal documents and formal writing.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Type className="w-5 h-5 text-purple-400" />
              <span>Enter Number</span>
            </div>
            <button onClick={() => setNumber("1234")} className="flex items-center gap-2 px-3 py-1.5 text-sm text-theme-secondary hover:text-theme-primary transition">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">Number</label>
            <input type="number" value={number} onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-2xl font-mono focus:outline-none focus:border-purple-500 transition"
              placeholder="Enter any number" />
          </div>

          <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-theme-muted">In Words:</span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-purple-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-purple-400 font-semibold text-2xl break-words">{words}</div>
          </div>
        </div>

        <SEOSections toolSlug="number-to-words-converter" toolName="Number to Words Converter" category="Converter" />
      </div>
    </div>
  )
}