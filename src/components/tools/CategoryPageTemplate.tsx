"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Flame, Sparkles, Zap, Shield, Globe } from 'lucide-react'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import type { Category } from '@/config/tools-data'

interface CategoryPageTemplateProps {
  category: Category
}

export default function CategoryPageTemplate({ category }: CategoryPageTemplateProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = category.tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const hotTools = category.tools.filter((t) => Boolean((t as { hot?: boolean }).hot))

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: category.name }
      ]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">
              {category.liveTools} of {category.totalTools} tools live
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">
              {category.name.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    <>{word} </>
                  )}
                </span>
              ))}
            </h1>
            <p className="text-theme-secondary text-base md:text-lg mb-6">
              {category.longDescription}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-secondary" />
              <input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools (if any hot tools) */}
      {hotTools.length > 0 && !searchQuery && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-crimson-500" />
            <h2 className="text-xl font-bold text-theme-primary">Popular {category.name}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotTools.map((tool, idx) => (
              <Link
                key={idx}
                href={`/tools/${category.slug}/${tool.slug}`}
                className="group p-5 glass-card border border-theme rounded-xl card-hover"
              >
                <div className={`w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center mb-3`}>
                  <div className={category.color}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-theme-primary font-semibold text-sm mb-1 group-hover:text-crimson-500 transition-colors flex items-center gap-1">
                  {tool.name}
                  <Flame className="w-3 h-3 text-orange-500" />
                </h3>
                <p className="text-xs text-theme-secondary">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Tools Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-theme-primary">
              {searchQuery ? 'Search Results' : `All ${category.name}`}
            </h2>
            <p className="text-sm text-theme-secondary">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} {searchQuery ? 'found' : 'available'}
            </p>
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12 glass-card border border-theme rounded-xl">
            <Search className="w-12 h-12 text-theme-muted mx-auto mb-3" />
            <p className="text-theme-primary font-semibold mb-1">No tools found</p>
            <p className="text-sm text-theme-secondary">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool, idx) => (
              <Link
                key={idx}
                href={`/tools/${category.slug}/${tool.slug}`}
                className="group p-5 glass-card border border-theme rounded-xl card-hover flex items-start gap-3"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                  <div className={category.color}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-theme-primary font-semibold text-sm mb-1 group-hover:text-crimson-500 transition-colors flex items-center gap-1.5">
                    {tool.name}
                    {((tool as { hot?: boolean }).hot) && <Flame className="w-3 h-3 text-orange-500 flex-shrink-0" />}
                    {((tool as { new?: boolean }).new) && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-500 font-semibold">NEW</span>}
                  </h3>
                  <p className="text-xs text-theme-secondary line-clamp-2">{tool.description}</p>
                </div>
                <ArrowRight className="flex-shrink-0 w-4 h-4 text-theme-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 border-t border-theme">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-3">
            Why Use Our {category.name}?
          </h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Fast, free, and secure {category.name.toLowerCase()} for everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 glass-card border border-theme rounded-xl card-hover text-center">
            <div className="w-12 h-12 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-theme-secondary">All tools run in your browser for instant results.</p>
          </div>
          <div className="p-6 glass-card border border-theme rounded-xl card-hover text-center">
            <div className="w-12 h-12 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">100% Private</h3>
            <p className="text-sm text-theme-secondary">Your files never leave your device. Fully secure.</p>
          </div>
          <div className="p-6 glass-card border border-theme rounded-xl card-hover text-center">
            <div className="w-12 h-12 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Free Forever</h3>
            <p className="text-sm text-theme-secondary">No sign-up, no limits, no watermarks. Just tools.</p>
          </div>
        </div>
      </section>

      {/* Explore Other Categories CTA */}
      <section className="container mx-auto px-4 py-12 border-t border-theme">
        <div className="glass-card border border-theme rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-theme-primary mb-2">
            Explore More Categories
          </h3>
          <p className="text-theme-secondary mb-6">
            Browse all 200+ tools across 8 categories
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 btn-primary border-0 px-6 py-3 rounded-xl font-medium"
          >
            View All Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}