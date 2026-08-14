import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Lock, Eye, Database, Cookie, Mail, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - AI Productivity Ecosystem',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information when you use our 200+ free online tools.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 15, 2025'

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Breadcrumbs */}
      <div className="border-b border-theme bg-theme-secondary/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-theme-muted hover:text-crimson-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-theme">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 mb-6">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-lg text-theme-secondary mb-4">
            Your privacy is our top priority. Learn how we protect your data.
          </p>
          <p className="text-sm text-theme-muted">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl border border-green-500/30 bg-green-500/5">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <h2 className="text-lg font-bold text-theme-primary">Quick Summary</h2>
            </div>
            <ul className="space-y-2 text-sm text-theme-secondary ml-8">
              <li>• All our tools work entirely in your browser</li>
              <li>• Your files never leave your device</li>
              <li>• We don't require signup or personal information</li>
              <li>• We use minimal cookies for site functionality</li>
              <li>• We show ads via Google AdSense (with your consent)</li>
              <li>• You have full control over your data</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-8 px-6">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-crimson-500" />
              1. Introduction
            </h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>
                Welcome to AI Productivity Ecosystem ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website (aiproductivityecosystem.com).
              </p>
              <p>
                This Privacy Policy explains what information we collect, how we use it, and what choices you have regarding your information when you use our free online tools and services.
              </p>
              <p>
                By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-crimson-500" />
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-theme-secondary leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">2.1 Information You Don't Provide</h3>
                <p className="mb-2">Our tools are designed to work entirely in your browser. This means:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Files you upload (PDFs, images, documents) are processed locally on your device</li>
                  <li>Text you enter is not stored on our servers</li>
                  <li>Calculations happen in your browser</li>
                  <li>QR codes and barcodes are generated client-side</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">2.2 Automatically Collected Information</h3>
                <p className="mb-2">When you visit our website, we automatically collect certain information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Log Data:</strong> IP address, browser type, pages visited, time spent</li>
                  <li><strong>Device Information:</strong> Operating system, device type, screen resolution</li>
                  <li><strong>Usage Data:</strong> Which tools you use, how often, general patterns</li>
                  <li><strong>Location Data:</strong> Country and city (approximate, from IP address)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">2.3 Cookies and Tracking</h3>
                <p>We use minimal cookies for essential site functionality. See our Cookie Policy for details.</p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-crimson-500" />
              3. How We Use Your Information
            </h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>We use the collected information for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Providing Services:</strong> Delivering our tools and features to you</li>
                <li><strong>Improving Website:</strong> Understanding usage patterns to enhance user experience</li>
                <li><strong>Analytics:</strong> Measuring traffic and user engagement (via Google Analytics)</li>
                <li><strong>Security:</strong> Detecting and preventing fraudulent activity or abuse</li>
                <li><strong>Legal Compliance:</strong> Meeting legal obligations and enforcing our terms</li>
                <li><strong>Advertising:</strong> Displaying relevant ads through Google AdSense</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">4. Third-Party Services</h2>
            <div className="space-y-4 text-theme-secondary leading-relaxed">
              <p>We use the following third-party services:</p>
              
              <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                <h3 className="font-semibold text-theme-primary mb-2">Google Analytics</h3>
                <p className="text-sm">Helps us understand how users interact with our website. Data is anonymized. You can opt-out using the Google Analytics Opt-out Browser Add-on.</p>
              </div>

              <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                <h3 className="font-semibold text-theme-primary mb-2">Google AdSense</h3>
                <p className="text-sm">Displays ads on our website. Google may use cookies to serve ads based on your prior visits. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-crimson-500 hover:underline">Google Ads Settings</a>.</p>
              </div>

              <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                <h3 className="font-semibold text-theme-primary mb-2">Unsplash</h3>
                <p className="text-sm">We use Unsplash for displaying images on our prompt library. Unsplash's privacy policy applies to their services.</p>
              </div>

              <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                <h3 className="font-semibold text-theme-primary mb-2">Vercel Hosting</h3>
                <p className="text-sm">Our website is hosted on Vercel. Server logs may be collected for security and performance monitoring.</p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">5. Data Security</h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>We take data security seriously and implement industry-standard measures:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>HTTPS encryption for all data transmission</li>
                <li>Client-side processing (your data stays on your device)</li>
                <li>Regular security audits and updates</li>
                <li>Secure hosting infrastructure</li>
                <li>No storage of sensitive user files</li>
              </ul>
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Note:</strong> While we implement best practices, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">6. Your Rights (GDPR & CCPA)</h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>Under applicable data protection laws, you have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Access:</strong> Request information about data we collect</li>
                <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
                <li><strong>Withdraw Consent:</strong> Opt-out at any time</li>
              </ul>
              <p className="mt-4">To exercise these rights, contact us at <a href="mailto:privacy@aiproductivityecosystem.com" className="text-crimson-500 hover:underline">privacy@aiproductivityecosystem.com</a></p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">7. Children's Privacy</h2>
            <p className="text-theme-secondary leading-relaxed">
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we discover we have collected personal information from a child under 13, we will delete such information immediately. Parents who believe their child has provided us with personal information should contact us.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">8. International Users</h2>
            <p className="text-theme-secondary leading-relaxed">
              Our website is accessible worldwide. If you access our services from outside your country, please note that your information may be transferred to, stored, and processed in different countries. We take appropriate measures to ensure your data is protected regardless of location.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">9. Changes to This Policy</h2>
            <p className="text-theme-secondary leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically. Significant changes will be notified via a banner on our website.
            </p>
          </section>

          {/* Contact */}
          <section className="p-6 rounded-2xl bg-gradient-to-br from-crimson-500/10 to-pink-500/10 border border-crimson-500/30">
            <h2 className="text-2xl font-bold text-theme-primary mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-crimson-500" />
              10. Contact Us
            </h2>
            <p className="text-theme-secondary leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-theme-primary"><strong>Email:</strong> <a href="mailto:privacy@aiproductivityecosystem.com" className="text-crimson-500 hover:underline">privacy@aiproductivityecosystem.com</a></p>
              <p className="text-theme-primary"><strong>Contact Form:</strong> <Link href="/contact" className="text-crimson-500 hover:underline">Visit our Contact Page</Link></p>
              <p className="text-theme-primary"><strong>Response Time:</strong> Within 48 hours</p>
            </div>
          </section>

        </div>
      </article>
    </div>
  )
}