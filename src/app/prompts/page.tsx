"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Star, ArrowRight } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { allPrompts, promptCategories, getFeaturedPrompts } from "@/config/prompts-data"

export default function PromptsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const filteredPrompts = useMemo(() => {
    let filtered = allPrompts
    if (selectedCategory !== "all") filtered = filtered.filter(p => p.category === selectedCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    return filtered
  }, [search, selectedCategory])
  const featured = getFeaturedPrompts()
  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "AI Prompts" }]} />
        <div className="text-center mb-12 mt-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">{allPrompts.length}+ AI Prompts</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-theme-primary">AI <span className="gradient-text">Prompts</span> Library</h1>
          <p className="text-theme-secondary max-w-2xl mx-auto mb-6 text-lg">Discover powerful prompts for ChatGPT, Midjourney, DALL-E and more.</p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prompts..." className="w-full pl-12 pr-4 py-3 bg-theme-secondary border border-theme rounded-full text-theme-primary focus:outline-none focus:border-purple-500 transition" />
          </div>
        </div>
        {!search && selectedCategory === "all" && featured.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4"><Star className="w-5 h-5 text-yellow-400" /><h2 className="text-2xl font-bold text-theme-primary">Featured Prompts</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.slice(0, 6).map((prompt) => (
                <Link key={prompt.slug} href={`/prompts/${prompt.category}/${prompt.slug}`} className="group relative overflow-hidden rounded-xl">
                  <div className={`aspect-video bg-gradient-to-br ${prompt.gradient} p-6 flex flex-col justify-between h-full`}>
                    <div>
                      <div className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-white text-xs mb-2">{prompt.aiModel}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{prompt.title}</h3>
                      <p className="text-white/80 text-sm">{prompt.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white self-end group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-theme-primary mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedCategory("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === "all" ? "bg-purple-500 text-white" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>All ({allPrompts.length})</button>
            {promptCategories.map(cat => (<button key={cat.slug} onClick={() => setSelectedCategory(cat.slug)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === cat.slug ? "bg-purple-500 text-white" : "bg-theme-secondary text-theme-secondary border border-theme"}`}>{cat.name} ({cat.count})</button>))}
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-theme-primary mb-1">{selectedCategory === "all" ? "All Prompts" : promptCategories.find(c => c.slug === selectedCategory)?.name}</h2>
          <p className="text-sm text-theme-muted mb-4">{filteredPrompts.length} prompts found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrompts.map((prompt) => (
              <Link key={prompt.slug} href={`/prompts/${prompt.category}/${prompt.slug}`} className="glass-card rounded-xl p-5 card-hover group">
                <div className={`inline-block px-2 py-0.5 rounded-full bg-gradient-to-r ${prompt.gradient} text-white text-xs mb-3`}>{prompt.aiModel}</div>
                <h3 className="font-bold text-theme-primary mb-2">{prompt.title}</h3>
                <p className="text-sm text-theme-secondary mb-3">{prompt.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}