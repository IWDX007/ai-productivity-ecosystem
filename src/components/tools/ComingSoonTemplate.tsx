"use client"

import Link from 'next/link'
import { Bell, ArrowRight, Sparkles, Clock } from 'lucide-react'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import type { Category } from '@/config/tools-data'

export default function ComingSoonTemplate({ category }: { category: Category }) {
  return (
    <>
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: category.name }
      ]} />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-500/10 border border-crimson-500/20 text-crimson-500 text-sm font-semibold mb-6">
            <Clock className="w-4 h-4" />
            {category.phase || 'Coming Soon'}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-theme-primary">
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

          <p className="text-lg text-theme-secondary mb-8 max-w-2xl mx-auto">
            {category.longDescription}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
            <div className="p-4 glass-card border border-theme rounded-xl">
              <div className="text-2xl font-bold gradient-text">{category.totalTools}+</div>
              <div className="text-xs text-theme-secondary mt-1">Tools Planned</div>
            </div>
            <div className="p-4 glass-card border border-theme rounded-xl">
              <div className="text-2xl font-bold gradient-text">100%</div>
              <div className="text-xs text-theme-secondary mt-1">Free Forever</div>
            </div>
            <div className="p-4 glass-card border border-theme rounded-xl">
              <div className="text-2xl font-bold gradient-text">0</div>
              <div className="text-xs text-theme-secondary mt-1">Sign-up Required</div>
            </div>
          </div>

          {/* Notify Me */}
          <div className="max-w-md mx-auto glass-card border border-theme rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Bell className="w-5 h-5 text-crimson-500" />
              <h3 className="text-theme-primary font-semibold">Get Notified When Live</h3>
            </div>
            <p className="text-sm text-theme-secondary mb-4">
              Be the first to know when {category.name} launch!
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="btn-primary border-0 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Notify Me
              </button>
            </form>
          </div>

          {/* Alternative CTA */}
          <div className="space-y-3">
            <p className="text-sm text-theme-secondary">
              In the meantime, explore our 200+ live tools:
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 btn-primary border-0 px-6 py-3 rounded-xl font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Explore Live Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}