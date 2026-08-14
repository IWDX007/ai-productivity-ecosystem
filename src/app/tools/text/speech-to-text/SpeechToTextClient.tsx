"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useRef, useEffect } from "react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Mic, Square, Copy, Check, Trash2 } from "lucide-react"

interface Props { name: string; description: string; }
export default function SpeechToTextClient({ name, description }: Props) {
  const [text, setText] = useState("")
  const [listening, setListening] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const recogRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { setError("Speech recognition not supported. Try Chrome or Edge."); return }
    const r = new SR()
    r.continuous = true
    r.interimResults = true
    r.lang = "en-US"
    r.onresult = (e: any) => {
      let final = ""
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript + " "
      }
      if (final) setText(t => t + final)
    }
    r.onerror = (e: any) => setError("Error: " + e.error)
    r.onend = () => setListening(false)
    recogRef.current = r
  }, [])

  const start = () => { if (recogRef.current) { setError(""); recogRef.current.start(); setListening(true) } }
  const stop = () => { if (recogRef.current) { recogRef.current.stop(); setListening(false) } }

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <ToolPageMeta title="Speech To Text" description="Free online Speech To Text tool. Fast, secure, and easy to use. No registration required." keywords="speech to text, free online tool, speech-to-text, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Speech to Text" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Voice Tool</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Speech to <span className="gradient-text">Text</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Convert your voice into text in real-time using browser speech recognition.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-3xl">
        {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl mb-4">{error}</div>}

        <div className="flex gap-2 justify-center mb-6">
          {!listening ? (
            <button onClick={start} disabled={!!error} className="flex items-center gap-2 px-8 py-4 btn-primary rounded-full disabled:opacity-50">
              <Mic className="w-5 h-5" /> Start Recording
            </button>
          ) : (
            <button onClick={stop} className="flex items-center gap-2 px-8 py-4 bg-red-500 text-white rounded-full animate-pulse">
              <Square className="w-5 h-5" /> Stop Recording
            </button>
          )}
        </div>

        <div className="mb-4 flex justify-between items-center">
          <label className="text-sm font-medium text-theme-primary">Transcript:</label>
          <div className="flex gap-2">
            <button onClick={() => setText("")} disabled={!text} className="flex items-center gap-1 px-3 py-1 text-xs bg-theme-secondary hover:bg-crimson-500/10 hover:text-crimson-500 border border-theme rounded transition-colors disabled:opacity-50">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
            <button onClick={copy} disabled={!text} className="flex items-center gap-1 px-3 py-1 text-xs btn-primary rounded disabled:opacity-50">
              {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your speech will appear here..." className="w-full min-h-[300px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 resize-y" />
      </section>
</>
  )
}