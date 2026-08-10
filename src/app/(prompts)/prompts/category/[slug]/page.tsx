'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Copy, Check, Heart, Eye, Crown, ArrowLeft, Search, ChevronRight, Sparkles, TrendingUp } from 'lucide-react'
import { allPrompts, promptCategories, type Prompt } from '@/config/prompts-data'

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = promptCategories.find(c => c.slug === slug)
  
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'trending'>('popular')

  useEffect(() => {
    if (category) {
      document.title = `${category.name} Prompts - Free AI Prompts | PromptHub`
    }
  }, [category])

  if (!category) {
    notFound()
  }

  const categoryPrompts = allPrompts.filter(p => p.category === slug)
  
  const filteredPrompts = categoryPrompts
    .filter(p => 
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'popular') return b.views - a.views
      if (sortBy === 'newest') return 0
      if (sortBy === 'trending') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      return 0
    })

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

  const PromptCard = ({ prompt }: { prompt: Prompt }) => (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="group relative rounded-2xl overflow-hidden border border-theme hover:border-crimson-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl aspect-[3/4]"
    >
      <img
        src={prompt.imageUrl}
        alt={prompt.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
          <span className="text-xs font-bold text-white uppercase tracking-wide truncate max-w-[120px]">
            {prompt.title.split(' ').slice(0, 2).join(' ')}
          </span>
          <button onClick={(e) => { e.preventDefault(); toggleFavorite(prompt.id) }}>
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
            onClick={(e) => { e.preventDefault(); handleCopy(prompt) }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/30 transition-all"
          >
            {copiedId === prompt.id ? (
              <><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-xs font-semibold text-white">Copied!</span></>
            ) : (
              <><Copy className="w-3.5 h-3.5 text-white" /><span className="text-xs font-semibold text-white">Copy</span></>
            )}
          </button>
          <span className="text-xs text-white/70 font-medium">by PromptHub</span>
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Breadcrumbs */}
      <div className="border-b border-theme bg-theme-secondary/50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-theme-muted hover:text-crimson-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <Link href="/prompts" className="text-theme-muted hover:text-crimson-500">Prompts</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium">{category.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <Link href="/prompts" className="inline-flex items-center gap-2 text-theme-muted hover:text-crimson-500 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">All Categories</span>
          </Link>

          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-5xl shadow-2xl flex-shrink-0`}>
              {category.icon}
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">AI Prompt Library</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-primary mb-3">
                {category.name} <span className="gradient-text">Prompts</span>
              </h1>
              <p className="text-lg text-theme-secondary max-w-3xl">
                {category.description}. Copy & paste ready prompts to get amazing results instantly.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-theme max-w-2xl">
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">{categoryPrompts.length}</div>
              <div className="text-xs text-theme-muted uppercase tracking-wider">Prompts</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">{categoryPrompts.filter(p => p.isFeatured).length}</div>
              <div className="text-xs text-theme-muted uppercase tracking-wider">Featured</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-1">{categoryPrompts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</div>
              <div className="text-xs text-theme-muted uppercase tracking-wider">Total Views</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="px-6 py-6 border-y border-theme bg-theme-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-muted" />
              <input
                type="text"
                placeholder={`Search ${category.name} prompts...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-3 rounded-full bg-theme-primary border border-theme focus:border-crimson-500 text-theme-primary placeholder-theme-muted outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              {(['popular', 'newest', 'trending'] as const).map(sort => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-5 py-3 rounded-full text-sm font-semibold capitalize transition-all border ${
                    sortBy === sort
                      ? 'bg-crimson-500 text-white border-crimson-500'
                      : 'bg-theme-primary text-theme-secondary border-theme hover:border-crimson-500/50'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
          {searchQuery && (
            <div className="mt-4 text-sm text-theme-secondary">
              Found <span className="font-bold text-theme-primary">{filteredPrompts.length}</span> prompts
            </div>
          )}
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-theme-primary mb-2">No prompts found</h3>
              <p className="text-theme-secondary mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white font-semibold transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="px-6 py-16 border-t border-theme">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="text-xs text-theme-muted uppercase tracking-wider mb-2">Explore More</div>
            <h2 className="text-3xl font-bold text-theme-primary">Other AI Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {promptCategories.filter(c => c.slug !== slug).map(cat => (
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
    </div>
  )
}