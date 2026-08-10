import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Scale, AlertTriangle, Users, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - AI Productivity Ecosystem',
  description: 'Terms of Service for using our 200+ free online tools. Read our usage terms, rules, and conditions.',
}

export default function TermsPage() {
  const lastUpdated = 'January 15, 2025'

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="border-b border-theme bg-theme-secondary/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-theme-muted hover:text-crimson-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium">Terms of Service</span>
          </div>
        </div>
      </div>

      <section className="py-16 px-6 border-b border-theme">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 mb-6">
            <Scale className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-lg text-theme-secondary mb-4">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-theme-muted">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-green-500/30 bg-green-500/5">
            <h3 className="font-bold text-theme-primary mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              You CAN
            </h3>
            <ul className="space-y-1 text-sm text-theme-secondary">
              <li>✓ Use all tools for free</li>
              <li>✓ Use for personal or commercial work</li>
              <li>✓ Share our tools with others</li>
              <li>✓ Use without signup</li>
              <li>✓ Access from any device</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl border border-red-500/30 bg-red-500/5">
            <h3 className="font-bold text-theme-primary mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              You CANNOT
            </h3>
            <ul className="space-y-1 text-sm text-theme-secondary">
              <li>✗ Copy or clone our website</li>
              <li>✗ Use for illegal activities</li>
              <li>✗ Attempt to hack or abuse</li>
              <li>✗ Scrape or bulk automate</li>
              <li>✗ Resell our tools as your own</li>
            </ul>
          </div>
        </div>
      </section>

      <article className="py-8 px-6">
        <div className="max-w-4xl mx-auto space-y-10">

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>
                By accessing and using AI Productivity Ecosystem (aiproductivityecosystem.com), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">2. Service Description</h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>
                We provide 200+ free online tools including PDF editors, image processors, calculators, converters, developer tools, security utilities, QR/barcode generators, and an AI prompts library. All tools are designed to work in your browser without requiring signup or downloads.
              </p>
              <p>Our services are provided "as is" and "as available" without warranties of any kind.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-crimson-500" />
              3. User Responsibilities
            </h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>When using our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the tools for lawful purposes only</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not use automated scripts, bots, or scrapers</li>
                <li>Not overload our servers with excessive requests</li>
                <li>Not reverse engineer or attempt to extract our source code</li>
                <li>Not use our services to distribute malware or harmful content</li>
                <li>Not infringe on intellectual property rights of others</li>
                <li>Respect other users and maintain civil discourse</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">4. Intellectual Property</h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">4.1 Our Content</h3>
                <p>
                  All content on our website, including but not limited to design, logos, text, graphics, tool interfaces, and code, is the property of AI Productivity Ecosystem or its licensors and is protected by copyright and intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">4.2 Your Content</h3>
                <p>
                  Any files, text, or data you process through our tools remains your property. We do not claim ownership of your content. Since our tools work locally in your browser, we do not store or access your content.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">4.3 AI Prompts</h3>
                <p>
                  The AI prompts in our library are provided for free use. You may copy, modify, and use them for personal or commercial purposes. However, systematic republication of our entire prompt collection is not permitted.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              5. Disclaimers
            </h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <p><strong>Important:</strong> Our tools are provided "as is" without any warranties. We do not guarantee:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Accuracy of calculations or results</li>
                  <li>Uninterrupted or error-free service</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Preservation of files or data</li>
                </ul>
              </div>
              <p>
                <strong>Professional Advice:</strong> Our calculators and tools do not constitute professional advice (medical, legal, financial, etc.). Always consult qualified professionals for important decisions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">6. Limitation of Liability</h2>
            <p className="text-theme-secondary leading-relaxed">
              To the maximum extent permitted by law, AI Productivity Ecosystem shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">7. Third-Party Services</h2>
            <p className="text-theme-secondary leading-relaxed">
              Our website may include links to third-party websites or services (like Google AdSense, Unsplash). We are not responsible for the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">8. Advertising</h2>
            <p className="text-theme-secondary leading-relaxed">
              We display advertisements through Google AdSense to keep our services free. By using our website, you consent to displaying such ads. We do not endorse advertised products or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">9. Termination</h2>
            <p className="text-theme-secondary leading-relaxed">
              We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason including breach of these Terms. Since we don't require accounts, this typically means blocking specific IP addresses or usage patterns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">10. Changes to Terms</h2>
            <p className="text-theme-secondary leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">11. Governing Law</h2>
            <p className="text-theme-secondary leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Pakistan.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-theme-primary mb-4">12. Contact Information</h2>
            <p className="text-theme-secondary leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-theme-primary"><strong>Email:</strong> <a href="mailto:legal@aiproductivityecosystem.com" className="text-crimson-500 hover:underline">legal@aiproductivityecosystem.com</a></p>
              <p className="text-theme-primary"><strong>Contact Form:</strong> <Link href="/contact" className="text-crimson-500 hover:underline">Visit our Contact Page</Link></p>
            </div>
          </section>

        </div>
      </article>
    </div>
  )
}