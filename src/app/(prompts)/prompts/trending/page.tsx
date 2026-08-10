'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check, Heart, Eye, Crown, ArrowLeft, ChevronRight, Flame } from 'lucide-react'
import { allPrompts, type Prompt } from '@/config/prompts-data'

export default function TrendingPromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const trendingPrompts = [...allPrompts].sort((a, b) => b.views - a.views)

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.prompt)
    setCopiedId(prompt.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const PromptCard = ({ prompt, rank }: { prompt: Prompt; rank: number }) => (
    <Link href={`/prompts/${prompt.slug}`} className="group relative rounded-2xl overflow-hidden border border-theme hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] aspect-[3/4]">
      <img src={prompt.imageUrl} alt={prompt.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      
      {/* Rank badge */}
      <div className="absolute top-3 left-3 z-20 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
        #{rank}
      </div>
      
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {prompt.isPremium ? (
          <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold flex items-center gap-1">
            <Crown className="w-3 h-3" />Premium
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
            <Eye className="w-3 h-3 text-white" />
            <span className="text-xs text-white">{prompt.views > 1000 ? `${(prompt.views/1000).toFixed(1)}k` : prompt.views}</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-sm font-bold text-white mb-2 truncate">{prompt.title}</p>
        <div className="flex items-center justify-between">
          <button onClick={(e) => { e.preventDefault(); handleCopy(prompt) }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/30">
            {copiedId === prompt.id ? (<><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-xs font-semibold text-white">Copied!</span></>) : (<><Copy className="w-3.5 h-3.5 text-white" /><span className="text-xs font-semibold text-white">Copy</span></>)}
          </button>
          <button onClick={(e) => { e.preventDefault(); toggleFavorite(prompt.id) }}>
            <Heart className={`w-4 h-4 ${favorites.has(prompt.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="border-b border-theme bg-theme-secondary/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-theme-muted hover:text-crimson-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <Link href="/prompts" className="text-theme-muted hover:text-crimson-500">Prompts</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium">Trending</span>
          </div>
        </div>
      </div>

      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <Link href="/prompts" className="inline-flex items-center gap-2 text-theme-muted hover:text-crimson-500 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to all prompts</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 mb-4">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">What's Hot</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-theme-primary mb-4">Trending <span className="gradient-text">Prompts</span></h1>
          <p className="text-lg text-theme-secondary max-w-2xl mb-12">Most popular AI prompts this week. Ranked by views and engagement.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trendingPrompts.map((prompt, i) => <PromptCard key={prompt.id} prompt={prompt} rank={i + 1} />)}
          </div>
        </div>
      </section>
    </div>
  )
}