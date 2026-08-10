"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState, useEffect } from "react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { Play, Square } from "lucide-react"

export default function Page() {
  const [text, setText] = useState("")
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voice, setVoice] = useState<string>("")
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices()
      setVoices(v)
      if (v.length > 0 && !voice) setVoice(v[0].name)
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
  }, [])

  const speak = () => {
    if (!text) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const v = voices.find(x => x.name === voice)
    if (v) u.voice = v
    u.rate = rate
    u.pitch = pitch
    u.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(u)
    setSpeaking(true)
  }

  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(false) }

  return (
    <>
      <ToolPageMeta title="Text To Speech" description="Free online Text To Speech tool. Fast, secure, and easy to use. No registration required." keywords="text to speech, free online tool, text-to-speech, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text to Speech" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Voice Tool</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Text to <span className="gradient-text">Speech</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Convert text into natural-sounding speech using browser voices.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-3xl">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text to convert to speech..." className="w-full min-h-[200px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 resize-y mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-theme-secondary mb-2">Voice</label>
            <select value={voice} onChange={(e) => setVoice(e.target.value)} className="w-full p-2 bg-theme-card border border-theme rounded-lg text-theme-primary text-sm">
              {voices.map((v, i) => <option key={i} value={v.name}>{v.name} ({v.lang})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-theme-secondary mb-2">Speed: {rate.toFixed(1)}x</label>
            <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full accent-crimson-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-theme-secondary mb-2">Pitch: {pitch.toFixed(1)}</label>
            <input type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full accent-crimson-500" />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button onClick={speak} disabled={!text || speaking} className="flex items-center gap-2 px-6 py-3 btn-primary rounded-lg disabled:opacity-50">
            <Play className="w-4 h-4" /> {speaking ? "Speaking..." : "Speak"}
          </button>
          <button onClick={stop} disabled={!speaking} className="flex items-center gap-2 px-6 py-3 bg-theme-secondary border border-theme text-theme-primary rounded-lg disabled:opacity-50">
            <Square className="w-4 h-4" /> Stop
          </button>
        </div>
      </section>

      <SEOSections toolSlug="text-to-speech" toolName="Text to Speech" />
    </>
  )
}