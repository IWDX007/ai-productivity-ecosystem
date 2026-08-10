'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Copy, Check, Heart, Eye, Share2, ArrowLeft, Sparkles, Crown, Lightbulb, Zap, Tag, ChevronRight } from 'lucide-react'
import { allPrompts, type Prompt } from '@/config/prompts-data'

export default function PromptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const prompt = allPrompts.find(p => p.slug === slug)
  
  const [copied, setCopied] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [shared, setShared] = useState(false)

  useEffect(() => {
    if (prompt) {
      document.title = `${prompt.title} - AI Prompt | PromptHub`
    }
  }, [prompt])

  if (!prompt) {
    notFound()
  }

  const relatedPrompts = allPrompts
    .filter(p => p.id !== prompt.id && (p.category === prompt.category || p.tags.some(t => prompt.tags.includes(t))))
    .slice(0, 6)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: prompt.title, text: prompt.description, url })
      } catch (e) {}
    } else {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

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
            <Link href={`/prompts/category/${prompt.category}`} className="text-theme-muted hover:text-crimson-500 capitalize">{prompt.category}</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium truncate">{prompt.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/prompts" className="inline-flex items-center gap-2 text-theme-muted hover:text-crimson-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to all prompts</span>
        </Link>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* LEFT - Image */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-3xl overflow-hidden border border-theme aspect-[3/4] bg-theme-secondary shadow-2xl">
              <img
                src={prompt.imageUrl}
                alt={prompt.title}
                className="w-full h-full object-cover"
              />
              {prompt.isPremium && (
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Crown className="w-3.5 h-3.5" />
                  Premium
                </div>
              )}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                {prompt.aiModel}
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
                  <Eye className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs text-white font-medium">{prompt.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-purple-500 font-semibold uppercase tracking-wider">{prompt.category}</span>
                <span className="text-theme-muted">•</span>
                <span className="text-xs text-theme-muted uppercase tracking-wider">{prompt.aiModel}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4 leading-tight">
                {prompt.title}
              </h1>
              <p className="text-lg text-theme-secondary leading-relaxed">
                {prompt.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Prompt
                  </>
                )}
              </button>
              <button
                onClick={() => setFavorited(!favorited)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border font-semibold transition-all ${
                  favorited
                    ? 'bg-red-500/10 border-red-500 text-red-500'
                    : 'bg-theme-secondary border-theme text-theme-primary hover:border-red-500/50'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500' : ''}`} />
                {favorited ? 'Favorited' : 'Favorite'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-theme-secondary border border-theme text-theme-primary hover:border-crimson-500/50 font-semibold transition-all"
              >
                {shared ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                {shared ? 'Link Copied!' : 'Share'}
              </button>
            </div>

            {/* Prompt Text Box */}
            <div className="rounded-2xl border border-theme bg-theme-secondary overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-theme bg-theme-primary/50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-theme-primary">The Prompt</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-crimson-500/10 hover:bg-crimson-500/20 text-crimson-500 text-xs font-semibold transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-5">
                <pre className="whitespace-pre-wrap text-sm text-theme-primary font-mono leading-relaxed">
{prompt.prompt}
                </pre>
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-theme-muted" />
                <span className="text-sm font-semibold text-theme-primary">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-theme-secondary border border-theme text-xs text-theme-secondary hover:border-crimson-500/50 hover:text-crimson-500 transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* How to Use */}
            <div className="rounded-2xl border border-theme bg-theme-secondary p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-theme-primary">How to Use This Prompt</h3>
              </div>
              <ol className="space-y-3 text-sm text-theme-secondary">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <span>Click the <span className="font-semibold text-theme-primary">"Copy Prompt"</span> button above</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <span>Open <span className="font-semibold text-theme-primary">{prompt.aiModel}</span> in your browser</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 text-white text-xs font-bold flex items-center justify-center">3</span>
                  <span>Paste the prompt and replace <span className="font-mono bg-theme-primary px-1.5 py-0.5 rounded text-xs">[PLACEHOLDERS]</span> with your details</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-crimson-500 text-white text-xs font-bold flex items-center justify-center">4</span>
                  <span>Send and get amazing results instantly!</span>
                </li>
              </ol>
            </div>

            {/* Pro Tips */}
            <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-theme-primary">Pro Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-theme-secondary">
                <li className="flex gap-2"><span className="text-yellow-500">✓</span>Be specific with your inputs for better results</li>
                <li className="flex gap-2"><span className="text-yellow-500">✓</span>Try variations of the prompt to find what works best</li>
                <li className="flex gap-2"><span className="text-yellow-500">✓</span>Save your favorite outputs for future reference</li>
                <li className="flex gap-2"><span className="text-yellow-500">✓</span>Combine with other prompts for more complex tasks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <section className="border-t border-theme pt-12 mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs text-theme-muted uppercase tracking-wider mb-2">You might also like</div>
                <h2 className="text-3xl font-bold text-theme-primary">Related Prompts</h2>
              </div>
              <Link href="/prompts" className="text-sm text-crimson-500 hover:text-crimson-600 font-semibold flex items-center gap-1">
                See all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedPrompts.map(rp => (
                <Link
                  key={rp.id}
                  href={`/prompts/${rp.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-theme hover:border-crimson-500/50 transition-all hover:scale-105 aspect-[3/4]"
                >
                  <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  {rp.isPremium && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[9px] font-bold">
                      Premium
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs text-white font-bold truncate">{rp.title}</p>
                    <div className="flex items-center gap-1 text-[10px] text-white/60 mt-1">
                      <Eye className="w-2.5 h-2.5" />
                      {rp.views > 1000 ? `${(rp.views/1000).toFixed(1)}k` : rp.views}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}