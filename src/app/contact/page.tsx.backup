"use client"

import { useState } from "react"
import { Mail, MessageSquare, User, Send, CheckCircle, AlertCircle } from "lucide-react"
import Breadcrumbs from "@/components/layout/Breadcrumbs"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("https://formspree.io/f/xbgrylwv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.message || "Something went wrong. Please try again.")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-theme-secondary text-lg">
            Have questions? We&apos;d love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full gradient-crimson flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Email Us</h3>
            <p className="text-theme-secondary text-sm">support@aiproductivity.com</p>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full gradient-crimson flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Response Time</h3>
            <p className="text-theme-secondary text-sm">Within 24 hours</p>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full gradient-crimson flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Support</h3>
            <p className="text-theme-secondary text-sm">24/7 Available</p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-theme-secondary text-theme-primary rounded-xl border border-theme focus:outline-none focus:border-crimson-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-theme-secondary text-theme-primary rounded-xl border border-theme focus:outline-none focus:border-crimson-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-theme-primary mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-theme-secondary text-theme-primary rounded-xl border border-theme focus:outline-none focus:border-crimson-500 transition-colors"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-theme-primary mb-2">
                Message
              </label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-theme-secondary text-theme-primary rounded-xl border border-theme focus:outline-none focus:border-crimson-500 transition-colors resize-none"
                placeholder="Your message here..."
              />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-500 text-sm">Message sent successfully! We&apos;ll get back to you soon.</p>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-500 text-sm">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 gradient-crimson text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}