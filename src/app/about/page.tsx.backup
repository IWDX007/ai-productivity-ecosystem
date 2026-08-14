import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, Users, Target, Rocket, Heart, Zap, Shield, Globe, Award, TrendingUp, ChevronRight, CheckCircle2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us - AI Productivity Ecosystem',
  description: 'Learn about our mission to provide 200+ free online tools and AI prompts. Building the ultimate productivity platform for everyone.',
}

export default function AboutPage() {
  const values = [
    { icon: Heart, title: 'User First', description: 'Every decision we make prioritizes user experience and value', color: 'text-red-500', bg: 'bg-red-500/10' },
    { icon: Shield, title: 'Privacy Focused', description: 'Your data stays with you. All tools work in your browser', color: 'text-green-500', bg: 'bg-green-500/10' },
    { icon: Zap, title: 'Lightning Fast', description: 'Optimized for speed. Get results in milliseconds', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { icon: Globe, title: 'Accessible to All', description: 'Free forever. No signup, no barriers, works everywhere', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ]

  const stats = [
    { number: '201+', label: 'Free Tools' },
    { number: '30+', label: 'AI Prompts' },
    { number: '100K+', label: 'Happy Users' },
    { number: '100%', label: 'Free Forever' },
  ]

  const timeline = [
    { year: '2024', title: 'The Idea', description: 'Started with a vision - free productivity tools for everyone, no strings attached' },
    { year: '2024', title: 'First 50 Tools', description: 'Built and launched initial tool collection - PDF, Image, Text tools' },
    { year: '2025', title: '200+ Tools', description: 'Expanded to 200+ tools across 8 categories with premium quality' },
    { year: '2025', title: 'AI Prompts Launch', description: 'Added comprehensive AI prompts library for ChatGPT, Midjourney & more' },
    { year: 'Future', title: 'What is Next', description: '500+ tools, mobile apps, API access, and building the ultimate productivity platform' },
  ]

  const team = [
    { role: 'Founder & Developer', description: 'Passionate about making powerful tools accessible to everyone' },
    { role: 'Content Team', description: 'Creating helpful guides, prompts, and educational content' },
    { role: 'Community', description: 'Our amazing users who inspire us to build better every day' },
  ]

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Breadcrumbs */}
      <div className="border-b border-theme bg-theme-secondary/50">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-theme-muted hover:text-crimson-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-500/5 via-transparent to-purple-500/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-500/10 border border-crimson-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-crimson-500" />
            <span className="text-sm font-semibold text-crimson-500 uppercase tracking-wider">About Us</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-theme-primary mb-6 leading-tight">
            Building the <span className="gradient-text">Ultimate</span>
            <br />
            Productivity Platform
          </h1>

          <p className="text-lg md:text-xl text-theme-secondary max-w-3xl mx-auto leading-relaxed">
            We're on a mission to provide the world's best collection of free online tools and AI prompts - accessible to everyone, no signup required, 100% private.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-theme bg-theme-secondary/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm text-theme-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-purple-500">Our Story</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">Why We Exist</h2>
          </div>

          <div className="prose prose-lg max-w-none space-y-4 text-theme-secondary leading-relaxed">
            <p>
              It all started with a simple frustration - <strong className="text-theme-primary">why do online tools have to be so complicated?</strong> Every time we needed to convert a PDF, resize an image, or calculate something, we found ourselves buried in signup forms, popup ads, and paywalls.
            </p>
            <p>
              We believed there was a better way. Tools should be <strong className="text-theme-primary">simple, fast, private, and free</strong>. So we built exactly that.
            </p>
            <p>
              Today, AI Productivity Ecosystem hosts <strong className="text-theme-primary">200+ free online tools</strong> and a growing library of <strong className="text-theme-primary">AI prompts</strong>. Everything runs in your browser - meaning your files never leave your device. No signup, no tracking of your files, no premium walls.
            </p>
            <p>
              Whether you're a student, professional, developer, designer, or just someone who needs to get things done - we've built these tools for you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-theme-secondary/30 border-y border-theme">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
              <Star className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-green-500">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">What We Stand For</h2>
            <p className="text-theme-secondary max-w-2xl mx-auto">Core principles that guide everything we build</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div key={i} className="p-6 rounded-2xl bg-theme-primary border border-theme hover:border-crimson-500/50 transition-all hover:-translate-y-1">
                  <div className={`${value.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className={`${value.color} w-7 h-7`} />
                  </div>
                  <h3 className="text-lg font-bold text-theme-primary mb-2">{value.title}</h3>
                  <p className="text-sm text-theme-secondary">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
              <Rocket className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-500">Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">The Story So Far</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-crimson-500 via-purple-500 to-pink-500 -translate-x-1/2"></div>

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block flex-1"></div>
                  
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-crimson-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                    <span className="text-xs">{item.year}</span>
                  </div>

                  <div className="flex-1 p-5 rounded-2xl bg-theme-secondary border border-theme hover:border-crimson-500/50 transition-all">
                    <h3 className="text-lg font-bold text-theme-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-theme-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 bg-theme-secondary/30 border-y border-theme">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-4">
              <Users className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-yellow-500">The Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">Who We Are</h2>
            <p className="text-theme-secondary max-w-2xl mx-auto">A small but passionate team building tools we love using ourselves</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className="p-6 rounded-2xl bg-theme-primary border border-theme text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-crimson-500 to-pink-500 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.role.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-theme-primary mb-2">{member.role}</h3>
                <p className="text-sm text-theme-secondary">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">What We Offer</h2>
            <p className="text-theme-secondary max-w-2xl mx-auto">Everything you need to boost your productivity, all in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-crimson-500/10 to-pink-500/10 border border-crimson-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-crimson-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-crimson-500" />
                </div>
                <h3 className="text-xl font-bold text-theme-primary">201+ Free Tools</h3>
              </div>
              <ul className="space-y-2 text-sm text-theme-secondary">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-crimson-500" />PDF Tools (Merge, Split, Compress)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-crimson-500" />Image Tools (Resize, Convert, Edit)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-crimson-500" />Text & Developer Tools</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-crimson-500" />Calculators & Converters</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-crimson-500" />Security & QR Code Tools</li>
              </ul>
              <Link href="/tools" className="inline-flex items-center gap-2 mt-4 text-crimson-500 font-semibold text-sm hover:gap-3 transition-all">
                Explore Tools <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-theme-primary">AI Prompts Library</h3>
              </div>
              <ul className="space-y-2 text-sm text-theme-secondary">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" />ChatGPT Prompts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" />Midjourney & DALL-E Prompts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" />Claude & Gemini Prompts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" />AI Coding & Video Prompts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" />Music & Voice AI Prompts</li>
              </ul>
              <Link href="/prompts" className="inline-flex items-center gap-2 mt-4 text-purple-500 font-semibold text-sm hover:gap-3 transition-all">
                Browse Prompts <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-crimson-500/10 via-pink-500/10 to-purple-500/10 border border-crimson-500/30">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-500/10 border border-crimson-500/30 mb-6">
            <TrendingUp className="w-4 h-4 text-crimson-500" />
            <span className="text-sm font-semibold text-crimson-500">Join 100,000+ Users</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Ready to Get <span className="gradient-text">Productive</span>?
          </h2>
          <p className="text-theme-secondary mb-8 max-w-xl mx-auto">
            Start using our free tools right now. No signup, no downloads, no hassle.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tools">
              <Button size="lg" className="btn-primary border-0 px-8 py-6">
                <Rocket className="w-5 h-5 mr-2" />
                Explore Tools
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-theme text-theme-primary hover:bg-theme-secondary px-8 py-6">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}