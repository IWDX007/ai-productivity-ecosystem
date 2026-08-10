import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Productivity Ecosystem - 200+ Free Online Tools for Everyone",
  description: "Free online tools: PDF, Image, Text, Calculators, Converters, Developer tools, Security tools, QR & Barcode. 200+ tools, 100% free, no signup, all in your browser.",
  keywords: "free online tools, pdf tools, image tools, text tools, calculators, converters, developer tools, security tools, qr code, barcode, ai productivity, ai prompts, chatgpt prompts, midjourney prompts",
  openGraph: {
    title: "AI Productivity Ecosystem - 200+ Free Online Tools",
    description: "200+ free online tools + AI prompts library. PDF, Image, Text, Calculators, Converters and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Productivity Ecosystem - 200+ Free Online Tools",
    description: "200+ free online tools + AI prompts. All in your browser, 100% private.",
  },
}

import Link from 'next/link'
import { 
  Sparkles, ArrowRight, Zap, Shield, Rocket, FileText, 
  Image as ImageIcon, Type, Code, Calculator, Ruler, Lock, QrCode,
  Star, TrendingUp, Users, Award, Clock, Heart, CheckCircle2,
  Wand2, Layers, Globe, Coffee, MousePointer2, Play, Copy, Eye, Crown, Flame
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { getFeaturedPrompts, getTrendingPrompts, promptCategories, totalPrompts } from '@/config/prompts-data'

export default function HomePage() {
  const featuredPrompts = getFeaturedPrompts(6)
  const trendingPrompts = getTrendingPrompts(8)

  const categories = [
    { name: 'PDF Tools', slug: 'pdf', count: 15, icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10', gradient: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/30' },
    { name: 'Image Tools', slug: 'image', count: 25, icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-500/10', gradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
    { name: 'Text Tools', slug: 'text', count: 30, icon: Type, color: 'text-purple-500', bg: 'bg-purple-500/10', gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
    { name: 'Developer', slug: 'developer', count: 35, icon: Code, color: 'text-green-500', bg: 'bg-green-500/10', gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
    { name: 'Calculators', slug: 'calculators', count: 30, icon: Calculator, color: 'text-pink-500', bg: 'bg-pink-500/10', gradient: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30' },
    { name: 'Converters', slug: 'converters', count: 30, icon: Ruler, color: 'text-indigo-500', bg: 'bg-indigo-500/10', gradient: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30' },
    { name: 'Security', slug: 'security', count: 20, icon: Lock, color: 'text-orange-500', bg: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30' },
    { name: 'QR & Barcode', slug: 'qr-barcode', count: 15, icon: QrCode, color: 'text-cyan-500', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30' },
  ]

  const popularTools = [
    { name: 'Word Counter', slug: 'word-counter', category: 'Text', icon: Type, color: 'text-purple-500', bg: 'bg-purple-500/10', description: 'Count words, characters instantly' },
    { name: 'Case Converter', slug: 'case-converter', category: 'Text', icon: Type, color: 'text-purple-500', bg: 'bg-purple-500/10', description: 'UPPER, lower, Title case converter' },
    { name: 'Lorem Ipsum', slug: 'lorem-ipsum', category: 'Text', icon: Type, color: 'text-purple-500', bg: 'bg-purple-500/10', description: 'Generate placeholder text instantly' },
    { name: 'PDF Merger', slug: 'pdf-merger', category: 'PDF', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10', description: 'Combine multiple PDFs into one' },
    { name: 'PDF Splitter', slug: 'pdf-splitter', category: 'PDF', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10', description: 'Split PDF into separate pages' },
    { name: 'PDF Compressor', slug: 'pdf-compressor', category: 'PDF', icon: FileText, color: 'text-red-500', bg: 'bg-red-500/10', description: 'Reduce PDF file size easily' },
    { name: 'BMI Calculator', slug: 'bmi-calculator', category: 'Calculator', icon: Calculator, color: 'text-pink-500', bg: 'bg-pink-500/10', description: 'Calculate your Body Mass Index' },
    { name: 'Age Calculator', slug: 'age-calculator', category: 'Calculator', icon: Calculator, color: 'text-pink-500', bg: 'bg-pink-500/10', description: 'Calculate age from date of birth' },
    { name: 'Percentage Calc', slug: 'percentage-calculator', category: 'Calculator', icon: Calculator, color: 'text-pink-500', bg: 'bg-pink-500/10', description: 'Calculate percentages easily' },
    { name: 'Image Compressor', slug: 'image-compressor', category: 'Image', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-500/10', description: 'Reduce image size, keep quality' },
    { name: 'Image Resizer', slug: 'image-resizer', category: 'Image', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-500/10', description: 'Resize images to any dimension' },
    { name: 'Image Converter', slug: 'image-converter', category: 'Image', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-500/10', description: 'Convert PNG, JPG, WebP formats' },
    { name: 'Password Generator', slug: 'password-generator', category: 'Security', icon: Lock, color: 'text-orange-500', bg: 'bg-orange-500/10', description: 'Create strong secure passwords' },
    { name: 'Hash Generator', slug: 'hash-generator', category: 'Security', icon: Lock, color: 'text-orange-500', bg: 'bg-orange-500/10', description: 'MD5, SHA-256 hash generator' },
    { name: 'QR Generator', slug: 'qr-generator', category: 'QR Code', icon: QrCode, color: 'text-cyan-500', bg: 'bg-cyan-500/10', description: 'Generate QR codes instantly' },
    { name: 'WiFi QR Code', slug: 'wifi-qr', category: 'QR Code', icon: QrCode, color: 'text-cyan-500', bg: 'bg-cyan-500/10', description: 'Share WiFi via QR code' },
    { name: 'JSON Formatter', slug: 'json-formatter', category: 'Developer', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10', description: 'Format and validate JSON data' },
    { name: 'Base64 Encoder', slug: 'base64-encoder', category: 'Developer', icon: Code, color: 'text-green-500', bg: 'bg-green-500/10', description: 'Encode/decode Base64 strings' },
    { name: 'Length Converter', slug: 'length-converter', category: 'Converter', icon: Ruler, color: 'text-indigo-500', bg: 'bg-indigo-500/10', description: 'Convert meters, feet, inches' },
    { name: 'Currency Converter', slug: 'currency-converter', category: 'Converter', icon: Ruler, color: 'text-indigo-500', bg: 'bg-indigo-500/10', description: 'Convert between currencies' },
  ]

  const stats = [
    { number: 201, suffix: '', label: 'Free Tools', icon: Wand2, color: 'text-crimson-500' },
    { number: totalPrompts, suffix: '+', label: 'AI Prompts', icon: Sparkles, color: 'text-purple-500' },
    { number: 100, suffix: 'K+', label: 'Happy Users', icon: Users, color: 'text-blue-500' },
    { number: 100, suffix: '%', label: 'Free Forever', icon: Heart, color: 'text-pink-500' },
  ]

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'All tools run in your browser. No uploads, instant results.', color: 'text-yellow-500', bg: 'bg-yellow-500/10', gradient: 'from-yellow-500/10 to-orange-500/10' },
    { icon: Shield, title: '100% Private', description: 'Your files never leave your device. Complete privacy guaranteed.', color: 'text-green-500', bg: 'bg-green-500/10', gradient: 'from-green-500/10 to-emerald-500/10' },
    { icon: Rocket, title: 'Always Free', description: 'No hidden costs, no subscriptions, no premium walls. Free forever.', color: 'text-crimson-500', bg: 'bg-crimson-500/10', gradient: 'from-crimson-500/10 to-pink-500/10' },
    { icon: Globe, title: 'Works Everywhere', description: 'Any device, any browser. No installation required.', color: 'text-blue-500', bg: 'bg-blue-500/10', gradient: 'from-blue-500/10 to-cyan-500/10' },
    { icon: Layers, title: '201+ Tools', description: 'Everything you need in one place. Growing every week.', color: 'text-purple-500', bg: 'bg-purple-500/10', gradient: 'from-purple-500/10 to-pink-500/10' },
    { icon: Award, title: 'Quality First', description: 'Beautifully designed, thoroughly tested, always improving.', color: 'text-orange-500', bg: 'bg-orange-500/10', gradient: 'from-orange-500/10 to-red-500/10' },
  ]

  const howItWorks = [
    { step: '01', title: 'Choose a Tool', description: 'Browse 201+ free tools across 8 categories', icon: MousePointer2 },
    { step: '02', title: 'Use Instantly', description: 'No signup required. Start using immediately', icon: Play },
    { step: '03', title: 'Get Results', description: 'Fast processing, download or copy your results', icon: CheckCircle2 },
  ]

  const testimonials = [
    { name: 'Sarah Ahmed', role: 'Content Writer', text: 'The word counter and text tools saved me hours! Best free tools site ever.', rating: 5 },
    { name: 'Muhammad Ali', role: 'Developer', text: 'JSON formatter and Base64 tools are exactly what I needed. Clean and fast!', rating: 5 },
    { name: 'Priya Sharma', role: 'Designer', text: 'Image compressor works amazingly. Better than paid tools I have used.', rating: 5 },
    { name: 'John Smith', role: 'Student', text: 'BMI calculator and other calculators helped me a lot with my project.', rating: 5 },
  ]

  return (
    <div className="min-h-screen bg-theme-primary pb-20 lg:pb-0 overflow-hidden scroll-smooth">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-crimson-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 -right-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

        <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-500/10 border border-crimson-500/30 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-crimson-500 animate-pulse" />
              <span className="text-sm font-medium text-theme-primary">Trusted by 100,000+ Users Worldwide</span>
              <span className="px-2 py-0.5 rounded-full bg-crimson-500 text-white text-xs font-bold">NEW</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-theme-primary mb-6 leading-tight animate-fade-in-up">
              Your All-in-One
              <br />
              <span className="gradient-text inline-block">Productivity Toolkit</span>
            </h1>

            <p className="text-base md:text-xl text-theme-secondary mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              <span className="text-crimson-500 font-bold">201+ free online tools</span> + <span className="text-purple-500 font-bold">{totalPrompts}+ AI prompts</span> for PDF editing, image processing, 
              calculations, ChatGPT, Midjourney and more. <br className="hidden md:block" />
              No signup, no uploads, 100% private.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
              <Link href="/tools">
                <Button size="lg" className="btn-primary border-0 px-8 py-6 text-base group">
                  <Wand2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Explore All Tools
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/prompts">
                <Button size="lg" variant="outline" className="px-8 py-6 text-base border-purple-500/50 text-purple-500 hover:bg-purple-500/10 group">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Browse AI Prompts
                </Button>
              </Link>
              <Link href="#popular">
                <Button size="lg" variant="outline" className="px-8 py-6 text-base border-theme text-theme-primary hover:bg-theme-secondary group">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Popular Tools
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-theme-muted animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No Signup Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Works Offline</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-theme-muted flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-crimson-500 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 lg:py-16 border-y border-theme bg-theme-secondary/50 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <ScrollReveal key={index} animation="zoom-in" delay={index * 100}>
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-theme-secondary border border-theme mb-3 group-hover:scale-110 transition-transform">
                      <Icon className={stat.color + ' w-6 h-6'} />
                    </div>
                    <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-theme-secondary text-sm font-medium">{stat.label}</div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* NEW: AI PROMPTS SECTION */}
      {/* ============================================ */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-pink-500/5"></div>
        
        <div className="container mx-auto px-4 relative">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">NEW • AI Prompt Library</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-theme-primary mb-4">
                Free <span className="gradient-text">AI Prompts</span>
              </h2>
              <p className="text-theme-secondary text-base lg:text-lg max-w-2xl mx-auto">
                {totalPrompts}+ hand-crafted prompts for ChatGPT, Midjourney, DALL-E, Claude and more. Copy & paste ready!
              </p>
            </div>
          </ScrollReveal>

          {/* Featured Prompts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto mb-12">
            {featuredPrompts.map((prompt, index) => (
              <ScrollReveal key={prompt.id} animation="fade-up" delay={index * 80}>
                <Link
                  href={`/prompts/${prompt.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-theme hover:border-purple-500/50 transition-all duration-300 hover:scale-105 block aspect-[3/4]"
                >
                  <img
                    src={prompt.imageUrl}
                    alt={prompt.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  {prompt.isPremium && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[10px] font-bold flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5" />
                      Premium
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-[10px] text-white/70 uppercase tracking-wider mb-1 font-medium">{prompt.aiModel}</div>
                    <p className="text-xs text-white font-bold truncate mb-2">{prompt.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-white/70">
                        <Eye className="w-2.5 h-2.5" />
                        <span>{prompt.views > 1000 ? `${(prompt.views/1000).toFixed(1)}k` : prompt.views}</span>
                      </div>
                      <div className="text-[10px] text-purple-300 font-semibold flex items-center gap-1">
                        <Copy className="w-2.5 h-2.5" />
                        Copy
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Trending Prompts - Horizontal Scroll */}
          <ScrollReveal animation="fade-up">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h3 className="text-xl font-bold text-theme-primary">Trending This Week</h3>
                </div>
                <Link href="/prompts" className="text-sm text-purple-500 hover:text-purple-400 font-semibold flex items-center gap-1">
                  See All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {trendingPrompts.map((prompt, index) => (
                  <ScrollReveal key={prompt.id} animation="zoom-in" delay={index * 50}>
                    <Link
                      href={`/prompts/${prompt.slug}`}
                      className="group relative rounded-xl overflow-hidden border border-theme hover:border-orange-500/50 transition-all block aspect-square"
                    >
                      <img
                        src={prompt.imageUrl}
                        alt={prompt.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-[10px] text-white font-bold truncate">{prompt.title}</p>
                        <div className="flex items-center gap-1 text-[9px] text-white/60 mt-0.5">
                          <Eye className="w-2 h-2" />
                          {prompt.views > 1000 ? `${(prompt.views/1000).toFixed(1)}k` : prompt.views}
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Prompt Categories Pills */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="max-w-5xl mx-auto mt-12">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-theme-primary mb-2">Browse by AI Model</h3>
                <p className="text-sm text-theme-secondary">Find prompts for your favorite AI tool</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {promptCategories.map((cat, index) => (
                  <Link
                    key={cat.slug}
                    href={`/prompts/category/${cat.slug}`}
                    className="group px-5 py-3 rounded-full bg-theme-secondary border border-theme hover:border-purple-500/50 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="text-sm font-semibold text-theme-primary group-hover:text-purple-500 transition-colors">{cat.name}</span>
                    <span className="text-xs text-theme-muted">({cat.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={300}>
            <div className="text-center mt-12">
              <Link href="/prompts">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-10 py-6 text-lg group hover:shadow-xl hover:shadow-purple-500/30">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Explore All {totalPrompts}+ Prompts
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="mt-4 text-sm text-theme-muted">100% Free • No signup • Copy & paste ready</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* POPULAR TOOLS */}
      <section id="popular" className="py-16 lg:py-24 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson-500/10 border border-crimson-500/30 mb-4">
                <TrendingUp className="w-4 h-4 text-crimson-500" />
                <span className="text-sm font-medium text-crimson-500">Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-theme-primary mb-4">
                Most <span className="gradient-text">Popular Tools</span>
              </h2>
              <p className="text-theme-secondary text-base lg:text-lg max-w-2xl mx-auto">
                20 fan-favorite tools used by thousands of users daily - across all 8 categories
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {popularTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
                  <Link
                    href={"/tools/" + tool.slug}
                    className="group relative glass-card p-5 rounded-2xl border border-theme hover:border-crimson-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-crimson-500/10 block h-full"
                  >
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-crimson-500" />
                    </div>
                    <div className={tool.bg + ' w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'}>
                      <Icon className={tool.color + ' w-6 h-6'} />
                    </div>
                    <div className="text-xs text-theme-muted mb-1 font-medium">{tool.category}</div>
                    <h3 className="font-bold text-theme-primary text-base mb-1 group-hover:text-crimson-500 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-theme-secondary line-clamp-2">
                      {tool.description}
                    </p>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal animation="fade-up" delay={200}>
            <div className="text-center mt-10">
              <Link href="/tools">
                <Button size="lg" variant="outline" className="border-theme text-theme-primary hover:bg-theme-secondary group">
                  View All 201 Tools
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 lg:py-24 bg-theme-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        
        <div className="container mx-auto px-4 relative">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
                <Layers className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-500">8 Categories</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-theme-primary mb-4">
                Browse by <span className="gradient-text">Category</span>
              </h2>
              <p className="text-theme-secondary text-base lg:text-lg max-w-2xl mx-auto">
                Find the perfect tool for your task across our 8 organized categories
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
            {categories.map((cat, index) => {
              const Icon = cat.icon
              const animations: Array<"slide-left" | "slide-right" | "fade-up" | "zoom-in"> = ["slide-left", "fade-up", "slide-right", "zoom-in"]
              const anim = animations[index % 4]
              return (
                <ScrollReveal key={index} animation={anim} delay={index * 80}>
                  <Link
                    href={"/tools/" + cat.slug}
                    className={"group relative overflow-hidden glass-card p-6 rounded-2xl border " + cat.border + " hover:scale-105 transition-all duration-300 block h-full"}
                  >
                    <div className={"absolute inset-0 bg-gradient-to-br " + cat.gradient + " opacity-0 group-hover:opacity-100 transition-opacity duration-300"}></div>
                    
                    <div className="relative z-10">
                      <div className={cat.bg + ' w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'}>
                        <Icon className={cat.color + ' w-7 h-7'} />
                      </div>
                      <h3 className="font-bold text-theme-primary text-lg mb-2 group-hover:text-crimson-500 transition-colors">
                        {cat.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className={cat.color + ' text-2xl font-bold'}>{cat.count}+</p>
                        <span className="text-xs text-theme-muted">Tools</span>
                      </div>
                      <div className="mt-4 flex items-center text-xs text-theme-muted group-hover:text-crimson-500 transition-colors">
                        Explore <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 lg:py-24 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                <Star className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">Why We are Different</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-theme-primary mb-4">
                Why Choose <span className="gradient-text">Us?</span>
              </h2>
              <p className="text-theme-secondary text-base lg:text-lg max-w-2xl mx-auto">
                Built with love, designed for productivity, free for everyone
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                  <div className={"group relative overflow-hidden glass-card p-6 lg:p-8 rounded-2xl border border-theme hover:border-crimson-500/50 transition-all duration-300 hover:-translate-y-2 h-full"}>
                    <div className={"absolute inset-0 bg-gradient-to-br " + feature.gradient + " opacity-0 group-hover:opacity-100 transition-opacity"}></div>
                    <div className="relative z-10">
                      <div className={feature.bg + ' w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'}>
                        <Icon className={feature.color + ' w-7 h-7'} />
                      </div>
                      <h3 className="text-xl font-bold text-theme-primary mb-3">{feature.title}</h3>
                      <p className="text-theme-secondary">{feature.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 lg:py-24 bg-theme-secondary relative">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-500">Simple & Fast</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-theme-primary mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-theme-secondary text-base lg:text-lg max-w-2xl mx-auto">
                Get productive in just 3 simple steps
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-transparent via-crimson-500/30 to-transparent"></div>
            
            {howItWorks.map((item, index) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={index} animation="fade-up" delay={index * 200}>
                  <div className="relative text-center group">
                    <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-full bg-crimson-500/10 group-hover:bg-crimson-500/20 transition-colors animate-pulse-slow"></div>
                      <div className="absolute inset-2 rounded-full bg-theme-primary border-2 border-crimson-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-crimson-500" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-crimson-500 text-white text-sm font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-theme-primary mb-2">{item.title}</h3>
                    <p className="text-theme-secondary">{item.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 lg:py-24 relative">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-4">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">User Reviews</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-theme-primary mb-4">
                Loved by <span className="gradient-text">Thousands</span>
              </h2>
              <p className="text-theme-secondary text-base lg:text-lg max-w-2xl mx-auto">
                See what our users are saying about our tools
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} animation="flip-up" delay={index * 150}>
                <div className="glass-card p-6 rounded-2xl border border-theme hover:border-crimson-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-theme-secondary text-sm mb-4 leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-theme">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-theme-primary text-sm">{testimonial.name}</div>
                      <div className="text-xs text-theme-muted">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-500/10 via-pink-500/10 to-purple-500/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="zoom-in">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-500/10 border border-crimson-500/30 mb-6">
                <Coffee className="w-4 h-4 text-crimson-500" />
                <span className="text-sm font-medium text-theme-primary">Ready to Boost Your Productivity?</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-theme-primary mb-6">
                Start Using <span className="gradient-text">Free Tools</span>
                <br />
                Right Now!
              </h2>
              
              <p className="text-theme-secondary text-lg mb-10 max-w-2xl mx-auto">
                Join 100,000+ users saving hours every day with our free online tools and AI prompts. 
                No signup, no downloads, no hassle.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tools">
                  <Button size="lg" className="btn-primary border-0 px-10 py-6 text-lg group">
                    <Rocket className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/prompts">
                  <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-500 hover:bg-purple-500/10 px-10 py-6 text-lg group">
                    <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Browse AI Prompts
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-theme-muted">
                No credit card required • No signup needed • 100% free forever
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}