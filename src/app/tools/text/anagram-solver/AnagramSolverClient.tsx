"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { useState } from "react"
import { findAnagrams, areAnagrams } from "@/lib/processing/text/allTextProcessors"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { Check, X } from "lucide-react"

interface AnagramSolverClientProps {
  name?: string;
  description?: string;
}

interface Props { name: string; description: string; }
export default function AnagramSolverClient({ name, description }: AnagramSolverClientProps) {
  const [mode, setMode] = useState<"check" | "find">("check")
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [wordList, setWordList] = useState("")

  const areAna = areAnagrams(text1, text2)
  const found = findAnagrams(text1, wordList)

  return (
    <>
      <ToolPageMeta title="Anagram Solver" description="Free online Anagram Solver tool. Fast, secure, and easy to use. No registration required." keywords="anagram solver, free online tool, anagram-solver, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Anagram" }]} />
      <section className="relative border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="inline-flex px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">Text Tool</div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">Anagram <span className="gradient-text">Solver</span></h1>
          <p className="text-theme-secondary max-w-2xl mx-auto">Check if two words are anagrams or find anagrams from a word list.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode("check")} className={`flex-1 p-3 rounded-lg text-sm transition-colors ${mode === "check" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>Compare Two Words</button>
          <button onClick={() => setMode("find")} className={`flex-1 p-3 rounded-lg text-sm transition-colors ${mode === "find" ? "bg-crimson-500/10 text-crimson-500 border border-crimson-500/20" : "bg-theme-secondary text-theme-primary"}`}>Find in List</button>
        </div>

        {mode === "check" ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input value={text1} onChange={(e) => setText1(e.target.value)} placeholder="First word..." className="p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" />
              <input value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Second word..." className="p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500" />
            </div>
            {text1 && text2 && (
              <div className={`p-6 rounded-xl text-center ${areAna ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                {areAna ? <><Check className="w-8 h-8 text-green-500 mx-auto mb-2" /><div className="font-bold text-green-500">They are Anagrams!</div></> : <><X className="w-8 h-8 text-red-500 mx-auto mb-2" /><div className="font-bold text-red-500">Not Anagrams</div></>}
              </div>
            )}
          </>
        ) : (
          <>
            <input value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Target word..." className="w-full p-3 bg-theme-card border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-crimson-500 mb-4" />
            <textarea value={wordList} onChange={(e) => setWordList(e.target.value)} placeholder="Enter word list (space or newline separated)..." className="w-full min-h-[150px] p-4 bg-theme-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 resize-y mb-4" />
            {text1 && found.length > 0 && (
              <div className="p-4 glass-card border border-theme rounded-xl">
                <h3 className="text-sm font-semibold text-theme-primary mb-3">Found {found.length} Anagram{found.length !== 1 ? "s" : ""}:</h3>
                <div className="flex flex-wrap gap-2">
                  {found.map((w, i) => <span key={i} className="px-3 py-1 bg-crimson-500/10 text-crimson-500 rounded-full text-sm">{w}</span>)}
                </div>
              </div>
            )}
          </>
        )}
      </section>
</>
  )
}