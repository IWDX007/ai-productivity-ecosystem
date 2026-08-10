'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MessageSquare, Send, MapPin, Clock, Phone, ChevronRight, CheckCircle2, AlertCircle, User, FileText, HelpCircle, Bug, Lightbulb, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // TODO: Replace with Formspree URL when you get one
    // Example: https://formspree.io/f/YOUR_FORM_ID
    const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE'

    try {
      // Simulating submission - Replace with actual Formspree API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Uncomment when Formspree is set up:
      // const response = await fetch(FORMSPREE_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (!response.ok) throw new Error('Submission failed')

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const categories = [
    { id: 'general', label: 'General Inquiry', icon: HelpCircle, color: 'text-blue-500' },
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-500' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-500' },
    { id: 'partnership', label: 'Partnership', icon: Handshake, color: 'text-green-500' },
  ]

  const contactMethods = [
    { icon: Mail, title: 'Email Us', value: 'hello@aiproductivityecosystem.com', href: 'mailto:hello@aiproductivityecosystem.com', color: 'text-crimson-500', bg: 'bg-crimson-500/10' },
    { icon: MessageSquare, title: 'Support', value: 'support@aiproductivityecosystem.com', href: 'mailto:support@aiproductivityecosystem.com', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: Clock, title: 'Response Time', value: 'Within 24-48 hours', href: '#', color: 'text-green-500', bg: 'bg-green-500/10' },
  ]

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Breadcrumbs */}
      <div className="border-b border-theme bg-theme-secondary/50">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-theme-muted hover:text-crimson-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-theme">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-crimson-500/10 border border-crimson-500/30 mb-6">
            <Mail className="w-4 h-4 text-crimson-500" />
            <span className="text-sm font-semibold text-crimson-500 uppercase tracking-wider">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-theme-primary mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-lg text-theme-secondary max-w-2xl mx-auto">
            Have a question, feedback, or suggestion? We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, i) => {
            const Icon = method.icon
            return (
              <a
                key={i}
                href={method.href}
                className="p-6 rounded-2xl bg-theme-secondary border border-theme hover:border-crimson-500/50 transition-all hover:-translate-y-1 group"
              >
                <div className={`${method.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`${method.color} w-7 h-7`} />
                </div>
                <h3 className="text-lg font-bold text-theme-primary mb-2">{method.title}</h3>
                <p className="text-sm text-theme-secondary break-all">{method.value}</p>
              </a>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-2xl bg-theme-secondary border border-theme">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-theme-primary mb-2">Send us a Message</h2>
                <p className="text-sm text-theme-secondary">Fill out the form below and we'll get back to you soon</p>
              </div>

              {/* Success Message */}
              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-theme-primary">Message Sent!</h4>
                    <p className="text-sm text-theme-secondary">Thanks for reaching out. We'll get back to you within 24-48 hours.</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-theme-primary">Something went wrong</h4>
                    <p className="text-sm text-theme-secondary">Please try again or email us directly at hello@aiproductivityecosystem.com</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-3">Category *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {categories.map(cat => {
                      const Icon = cat.icon
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                            formData.category === cat.id
                              ? 'border-crimson-500 bg-crimson-500/10'
                              : 'border-theme bg-theme-primary hover:border-crimson-500/50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${cat.color}`} />
                          <span className="text-xs font-medium text-theme-primary">{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-theme-primary mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-theme-primary border border-theme focus:border-crimson-500 text-theme-primary placeholder-theme-muted outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-theme-primary mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-theme-primary border border-theme focus:border-crimson-500 text-theme-primary placeholder-theme-muted outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-primary border border-theme focus:border-crimson-500 text-theme-primary placeholder-theme-muted outline-none transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-theme-primary border border-theme focus:border-crimson-500 text-theme-primary placeholder-theme-muted outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                  <p className="text-xs text-theme-muted mt-2">{formData.message.length} / 1000 characters</p>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-primary border-0 py-6 text-base"
                >
                  {status === 'submitting' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-theme-muted text-center">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy-policy" className="text-crimson-500 hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar - FAQ & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick FAQ */}
            <div className="p-6 rounded-2xl bg-theme-secondary border border-theme">
              <h3 className="text-lg font-bold text-theme-primary mb-4">Quick Questions?</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-theme-primary text-sm mb-1">Are the tools really free?</h4>
                  <p className="text-xs text-theme-secondary">Yes! 100% free forever, no hidden costs, no signup needed.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-theme-primary text-sm mb-1">Do you store my files?</h4>
                  <p className="text-xs text-theme-secondary">No. All processing happens in your browser locally.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-theme-primary text-sm mb-1">Can I request a new tool?</h4>
                  <p className="text-xs text-theme-secondary">Absolutely! Use the "Feature Request" category above.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-theme-primary text-sm mb-1">How do I report a bug?</h4>
                  <p className="text-xs text-theme-secondary">Select "Bug Report" and describe the issue in detail.</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-crimson-500/10 to-pink-500/10 border border-crimson-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-crimson-500" />
                <h3 className="text-lg font-bold text-theme-primary">Response Time</h3>
              </div>
              <ul className="space-y-2 text-sm text-theme-secondary">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" />General: 24-48 hours</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" />Bug Reports: Priority</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" />Partnerships: 3-5 days</li>
              </ul>
            </div>

            {/* Alternative Contact */}
            <div className="p-6 rounded-2xl bg-theme-secondary border border-theme">
              <h3 className="text-lg font-bold text-theme-primary mb-3">Prefer Email?</h3>
              <p className="text-sm text-theme-secondary mb-3">Send us an email directly:</p>
              <a href="mailto:hello@aiproductivityecosystem.com" className="text-sm text-crimson-500 hover:underline break-all">
                hello@aiproductivityecosystem.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}