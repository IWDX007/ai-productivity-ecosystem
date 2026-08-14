"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useMemo } from "react"
import { Copy, Check, RotateCcw, Radio } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

interface MorseCodeConverterPageProps {
  name?: string;
  description?: string;
}

const MORSE_MAP: Record<string, string> = {
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
  "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
  "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
  "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
  "Y": "-.--", "Z": "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "@": ".--.-.",
}

const REVERSE_MORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
)

export default function MorseCodeConverterPage({ name, description }: MorseCodeConverterPageProps) {
  const [mode, setMode] = useState<"toMorse" | "toText">("toMorse")
  const [input, setInput] = useState("HELLO")
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (mode === "toMorse") {
      return input.toUpperCase().split("").map(c => {
        if (c === " ") return "/"
        return MORSE_MAP[c] || ""
      }).filter(Boolean).join(" ")
    } else {
      return input.split(" / ").map(word =>
        word.split(" ").map(code => REVERSE_MORSE[code] || "").join("")
      ).join(" ")
    }
  }, [input, mode])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleModeSwitch = (newMode: "toMorse" | "toText") => {
    setMode(newMode)
    setInput(newMode === "toMorse" ? "HELLO" : ".... . .-.. .-.. ---")
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <ToolPageMeta title="Morse Code Converter" description="Convert text to Morse code and Morse code back to text. Learn Morse for amateur radio, scouting or fun." keywords="morse code converter, free online tool, morse-code-converter, converters tools, ai productivity" />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Converters", href: "/tools/converters" },
          { label: "Morse Code Converter" }
        ]} />

        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Converter Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-theme-primary">
            Morse Code <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Convert text to Morse code and Morse code back to text.
            Learn Morse for amateur radio, scouting or fun.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-theme-primary font-semibold">
              <Radio className="w-5 h-5 text-purple-400" />
              <span>Conversion Mode</span>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button onClick={() => handleModeSwitch("toMorse")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${mode === "toMorse" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>
              Text to Morse
            </button>
            <button onClick={() => handleModeSwitch("toText")}
              className={`flex-1 px-4 py-2 rounded-lg transition ${mode === "toText" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>
              Morse to Text
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-theme-muted mb-2 block">
              {mode === "toMorse" ? "Enter Text" : "Enter Morse Code (dots and dashes, / for spaces)"}
            </label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary text-lg font-mono focus:outline-none focus:border-purple-500 transition min-h-24"
              placeholder={mode === "toMorse" ? "HELLO WORLD" : ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."} />
          </div>

          <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-theme-muted">Result:</span>
              <button onClick={handleCopy} className="text-theme-muted hover:text-purple-400 transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-purple-400 font-mono text-lg break-all">{result || "..."}</div>
          </div>
        </div>
</div>
    </div>
  )
}