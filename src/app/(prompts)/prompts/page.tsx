'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Heart, Eye, Search, Sparkles, ChevronRight, Check, Crown, Flame } from 'lucide-react'
import {
  allPrompts,
  promptCategories,
  getFeaturedPrompts,
  getLatestPrompts,
  getPremiumPrompts,
  getTrendingPrompts,
  getPopularPrompts,
  totalPrompts,
  type Prompt
} from '@/config/prompts-data'

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const featuredPrompts = getFeaturedPrompts(6)
  const latestPrompts = getLatestPrompts(8)
  const premiumPrompts = getPremiumPrompts(4)
  const trendingPrompts = getTrendingPrompts(6)
  const popularPrompts = getPopularPrompts(8)

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

  const styles = [
    { id: 'all', label: '🎨 All Styles' },
    { id: 'photorealistic', label: '📷 Photorealistic' },
    { id: 'anime', label: '🎌 Anime' },
    { id: 'cinematic', label: '🎬 Cinematic' },
    { id: 'fantasy', label: '🏰 Fantasy' },
    { id: 'minimalist', label: '⚪ Minimalist' },
    { id: 'vibrant', label: '🌈 Vibrant' },
    { id: 'dark', label: '🌑 Dark Moody' },
  ]

  const PromptCard = ({ prompt }: { prompt: Prompt }) => (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="group relative flex-shrink-0 w-[280px] rounded-2xl overflow-hidden border border-theme hover:border-crimson-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-theme-secondary">
        <img
          src={prompt.imageUrl}
          alt={prompt.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Dark gradient overlay - always visible on image cards for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
            <span className="text-xs font-bold text-white uppercase tracking-wide truncate max-w-[140px]">
              {prompt.title.split(' ').slice(0, 2).join(' ')}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(prompt.id)
              }}
              className="ml-1"
            >
              <Heart className={`w-3.5 h-3.5 transition-all ${favorites.has(prompt.id) ? 'fill-red-500 text-red-500' : 'text-white hover:text-red-400'}`} />
            </button>
          </div>
          
          {prompt.isPremium ? (
            <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold flex items-center gap-1 shadow-lg">
              <Crown className="w-3 h-3" />
              Premium
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
              <Eye className="w-3 h-3 text-white" />
              <span className="text-xs text-white font-medium">{prompt.views > 1000 ? `${(prompt.views/1000).toFixed(1)}k` : prompt.views}</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.preventDefault()
                handleCopy(prompt)
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/30 transition-all"
            >
              {copiedId === prompt.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-semibold text-white">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-semibold text-white">Copy</span>
                </>
              )}
            </button>
            <span className="text-xs text-white/70 font-medium">by PromptHub</span>
          </div>
        </div>
      </div>
    </Link>
  )

  const filteredPrompts = searchQuery
    ? allPrompts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary">
      {/* Scrolling Ticker */}
      <div className="border-b border-theme bg-theme-secondary overflow-hidden">
        <div className="flex gap-8 py-2.5 animate-scroll whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-8">
              <span className="text-xs text-theme-muted">🇺🇸 <span className="font-bold text-theme-primary">Marcus T.</span> <span className="text-yellow-500">$5</span> · 8h ago</span>
              <span className="text-xs text-theme-muted">🇮🇳 <span className="font-bold text-theme-primary">Rohan D.</span> <span className="text-yellow-500">₹199</span> · 12h ago</span>
              <span className="text-xs text-theme-muted">🇬🇧 <span className="font-bold text-theme-primary">Anonymous</span> <span className="text-yellow-500">$3</span> · 1d ago</span>
              <span className="text-xs text-theme-muted">🇮🇳 <span className="font-bold text-theme-primary">Vishal M.</span> <span className="text-yellow-500">₹499</span> · 1d ago</span>
              <span className="text-xs text-theme-muted">🇮🇳 <span className="font-bold text-theme-primary">Priya S.</span> <span className="text-yellow-500">₹99</span> · 18h ago</span>
              <span className="text-xs text-theme-muted">🇮🇳 <span className="font-bold text-theme-primary">Aditi K.</span> <span className="text-yellow-500">₹299</span> · 3h ago</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-theme-secondary border border-theme mb-6">
                <Sparkles className="w-3.5 h-3.5 text-crimson-500" />
                <span className="text-xs font-semibold text-theme-secondary uppercase tracking-wider">Premium AI Prompt Library</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] text-theme-primary">
                Free AI Prompts
                <br />
                <span className="text-theme-muted">for ChatGPT, Midjourney</span>
                <br />
                <span className="text-theme-muted">& More</span>
              </h1>

              <p className="text-lg text-theme-secondary mb-4 leading-relaxed max-w-xl">
                Browse {totalPrompts}+ free AI prompts for ChatGPT, Midjourney, DALL-E, Stable Diffusion, Claude and more. Copy top-rated prompts instantly — no signup required.
              </p>

              <p className="text-sm text-theme-muted mb-8 max-w-xl">
                PromptHub is your curated collection of AI prompts for writing, art, coding, business, and more. New prompts added daily.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="#library" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson-500 text-white font-semibold hover:bg-crimson-600 transition-all shadow-lg">
                  Browse the library
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/tools/image" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-theme-secondary border border-theme hover:border-crimson-500/50 transition-all">
                  <span className="text-xl">🖼️</span>
                  <span className="text-sm font-medium text-theme-primary">AI Image Tools</span>
                </Link>
                <Link href="/tools" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-theme-secondary border border-theme hover:border-crimson-500/50 transition-all">
                  <span className="text-xl">⚡</span>
                  <span className="text-sm font-medium text-theme-primary">200+ Tools</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {featuredPrompts.slice(0, 6).map((prompt, i) => (
                <Link
                  key={prompt.id}
                  href={`/prompts/${prompt.slug}`}
                  className={`relative rounded-2xl overflow-hidden border border-theme hover:border-crimson-500/50 transition-all hover:scale-105 group ${i === 0 ? 'row-span-2 aspect-[3/8]' : 'aspect-[3/4]'}`}
                >
                  <img
                    src={prompt.imageUrl}
                    alt={prompt.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-xs text-white font-semibold truncate">{prompt.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-theme">
            <div>
              <div className="text-4xl font-bold text-theme-primary mb-1">{totalPrompts}+</div>
              <div className="text-xs text-theme-muted uppercase tracking-wider">Free AI Prompts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-theme-primary mb-1">{promptCategories.length}+</div>
              <div className="text-xs text-theme-muted uppercase tracking-wider">AI Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-theme-primary mb-1">200+</div>
              <div className="text-xs text-theme-muted uppercase tracking-wider">Free AI Tools</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-theme-primary mb-1">100%</div>
              <div className="text-xs text-theme-muted uppercase tracking-wider">No Signup Needed</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Feature Cards */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-secondary border border-theme hover:border-purple-500/50 transition-all">
            <div className="text-2xl mb-3">✨</div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">Find perfect prompts</h3>
            <p className="text-sm text-theme-secondary mb-4">{totalPrompts}+ tested prompts. Copy & paste ready.</p>
            <Link href="#library" className="text-sm font-semibold text-purple-500 hover:text-purple-400">Go →</Link>
          </div>
          <div className="p-6 rounded-2xl bg-theme-secondary border border-theme hover:border-orange-500/50 transition-all">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">Start with a free AI tool</h3>
            <p className="text-sm text-theme-secondary mb-4">200+ AI tools - browser-based, no signup.</p>
            <Link href="/tools" className="text-sm font-semibold text-orange-500 hover:text-orange-400">Go →</Link>
          </div>
          <div className="p-6 rounded-2xl bg-theme-secondary border border-theme hover:border-cyan-500/50 transition-all">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-theme-primary mb-2">Learn what works now</h3>
            <p className="text-sm text-theme-secondary mb-4">Guides for Midjourney, ChatGPT, Claude.</p>
            <Link href="/prompts" className="text-sm font-semibold text-cyan-500 hover:text-cyan-400">Go →</Link>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
            <input
              type="text"
              placeholder="Search prompts, styles, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-theme-secondary border border-theme focus:border-crimson-500 text-theme-primary placeholder-theme-muted outline-none text-base transition-all"
            />
          </div>
          {searchQuery && (
            <div className="mt-4 text-sm text-theme-secondary">
              Found <span className="font-bold text-theme-primary">{filteredPrompts.length}</span> prompts
            </div>
          )}
        </div>
      </section>

      {searchQuery && filteredPrompts.length > 0 && (
        <section className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {filteredPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest */}
      <section id="library" className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs text-theme-muted uppercase tracking-wider mb-2">Latest Drops</div>
              <h2 className="text-4xl font-bold text-theme-primary mb-2">Latest Prompts</h2>
              <p className="text-sm text-theme-secondary">Recently added AI prompts</p>
            </div>
            <Link href="/prompts/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary border border-theme hover:border-crimson-500/50 transition-all text-sm text-theme-primary">
              See all latest prompts
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {latestPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="text-xs text-theme-muted uppercase tracking-wider mb-2">Premium Spotlight</div>
              <h2 className="text-4xl font-bold text-theme-primary mb-3">Premium Prompts</h2>
              <p className="text-sm text-theme-secondary mb-6">Hand-crafted AI prompts for professional results</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/50 text-orange-500 hover:bg-orange-500/10 transition-all text-sm">
                See more premium prompts
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-3 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {premiumPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs text-theme-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                <Flame className="w-3 h-3" />
                What's Hot
              </div>
              <h2 className="text-4xl font-bold text-theme-primary mb-2">Trending Prompts</h2>
              <p className="text-sm text-theme-secondary">Top AI prompts this week</p>
            </div>
            <Link href="/prompts/trending" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary border border-theme hover:border-crimson-500/50 transition-all text-sm text-theme-primary">
              See all Trending Prompts
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {trendingPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Effects & Styles */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="text-xs text-theme-muted uppercase tracking-wider mb-2">Visual Styles</div>
            <h2 className="text-4xl font-bold text-theme-primary mb-2">Effects & Styles</h2>
            <p className="text-sm text-theme-secondary">Explore prompts by visual style</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
            {styles.map(style => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                  selectedStyle === style.id
                    ? 'bg-crimson-500 text-white border-crimson-500'
                    : 'bg-theme-secondary text-theme-secondary border-theme hover:border-crimson-500/50'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {popularPrompts.slice(0, 6).map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="text-xs text-theme-muted uppercase tracking-wider mb-2">Browse by Category</div>
            <h2 className="text-4xl font-bold text-theme-primary mb-2">Popular Categories</h2>
            <p className="text-sm text-theme-secondary">Discover AI prompts by AI model</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {promptCategories.map(cat => (
              <Link
                key={cat.slug}
                href={`/prompts/category/${cat.slug}`}
                className="group p-5 rounded-2xl bg-theme-secondary border border-theme hover:border-crimson-500/50 transition-all hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-sm font-bold text-theme-primary mb-1">{cat.name}</h3>
                <p className="text-xs text-theme-muted">{cat.count} prompts</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="px-6 py-16 border-t border-theme">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="text-xs text-theme-muted uppercase tracking-wider mb-2">What to try next</div>
            <h2 className="text-4xl font-bold text-theme-primary mb-2">Recommended for you</h2>
            <p className="text-sm text-theme-secondary">Hand-picked tools and resources</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href="/tools/image" className="p-5 rounded-2xl bg-theme-secondary border border-theme hover:border-blue-500/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl mb-3">🖼️</div>
              <h3 className="text-sm font-bold text-theme-primary mb-1">AI Image Tools</h3>
              <p className="text-xs text-theme-muted">25 image tools</p>
            </Link>
            <Link href="/tools/text" className="p-5 rounded-2xl bg-theme-secondary border border-theme hover:border-purple-500/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-xl mb-3">📝</div>
              <h3 className="text-sm font-bold text-theme-primary mb-1">Text Tools</h3>
              <p className="text-xs text-theme-muted">30 text tools</p>
            </Link>
            <Link href="/tools/pdf" className="p-5 rounded-2xl bg-theme-secondary border border-theme hover:border-red-500/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-xl mb-3">📄</div>
              <h3 className="text-sm font-bold text-theme-primary mb-1">PDF Tools</h3>
              <p className="text-xs text-theme-muted">15 PDF tools</p>
            </Link>
            <Link href="/tools/developer" className="p-5 rounded-2xl bg-theme-secondary border border-theme hover:border-green-500/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-xl mb-3">💻</div>
              <h3 className="text-sm font-bold text-theme-primary mb-1">Developer Tools</h3>
              <p className="text-xs text-theme-muted">35 dev tools</p>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}