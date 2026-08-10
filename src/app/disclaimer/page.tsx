import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Info, ChevronRight, XCircle, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer - AI Productivity Ecosystem',
  description: 'Important disclaimers about the use of our tools and information provided on our website.',
}

export default function DisclaimerPage() {
  const lastUpdated = 'January 15, 2025'

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="border-b border-theme bg-theme-secondary/50">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-theme-muted hover:text-crimson-500">Home</Link>
            <ChevronRight className="w-3 h-3 text-theme-muted" />
            <span className="text-theme-primary font-medium">Disclaimer</span>
          </div>
        </div>
      </div>

      <section className="py-16 px-6 border-b border-theme">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 mb-6">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-4">
            <span className="gradient-text">Disclaimer</span>
          </h1>
          <p className="text-lg text-theme-secondary mb-4">
            Important information about using our tools and services.
          </p>
          <p className="text-sm text-theme-muted">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">

          <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-theme-primary mb-2">Please Read Carefully</h2>
                <p className="text-sm text-theme-secondary">
                  The information provided by AI Productivity Ecosystem is for general informational and educational purposes only. Please read this disclaimer carefully before using our services.
                </p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">1. General Information Disclaimer</h2>
            <p className="text-theme-secondary leading-relaxed">
              All information on aiproductivityecosystem.com is published in good faith and for general information purposes only. We do not make any warranties about the completeness, reliability, or accuracy of this information. Any action you take based on the information on our website is strictly at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">2. Tool Accuracy Disclaimer</h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>Our tools include but are not limited to:</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                  <h3 className="font-semibold text-theme-primary mb-2">Calculators</h3>
                  <p className="text-sm">BMI, Age, Financial, and other calculators provide estimates only. Results may vary based on individual circumstances.</p>
                </div>
                <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                  <h3 className="font-semibold text-theme-primary mb-2">Converters</h3>
                  <p className="text-sm">Unit conversions use standard formulas. Currency rates may not be real-time. Always verify important conversions.</p>
                </div>
                <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                  <h3 className="font-semibold text-theme-primary mb-2">File Processing</h3>
                  <p className="text-sm">While our tools work reliably, always keep backups of original files. We're not responsible for data loss.</p>
                </div>
                <div className="p-4 rounded-xl bg-theme-secondary border border-theme">
                  <h3 className="font-semibold text-theme-primary mb-2">AI Prompts</h3>
                  <p className="text-sm">Results from AI models vary. Prompts are templates - actual output depends on the AI service used.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">3. No Professional Advice</h2>
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <div className="space-y-2 text-theme-secondary">
                  <p><strong className="text-theme-primary">Our tools DO NOT provide:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li><strong>Medical Advice:</strong> BMI and health calculators are informational only. Consult a doctor</li>
                    <li><strong>Legal Advice:</strong> Any legal-related tools don't replace professional legal counsel</li>
                    <li><strong>Financial Advice:</strong> Financial calculators are estimates. Consult a financial advisor</li>
                    <li><strong>Tax Advice:</strong> Tax-related tools don't replace certified tax professionals</li>
                    <li><strong>Professional Certification:</strong> Not a substitute for licensed professionals in any field</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">4. External Links Disclaimer</h2>
            <p className="text-theme-secondary leading-relaxed">
              Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. We are not responsible for the content or practices of any linked third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">5. Advertising Disclaimer</h2>
            <div className="space-y-3 text-theme-secondary leading-relaxed">
              <p>Our website displays advertisements through Google AdSense to support our free services. Please note:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>We do not endorse advertised products or services</li>
                <li>Ads are automatically served based on user interests</li>
                <li>Clicking ads is at your own discretion</li>
                <li>We are not responsible for third-party products/services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">6. Errors and Omissions</h2>
            <p className="text-theme-secondary leading-relaxed">
              While we strive to keep our information accurate and up-to-date, our tools and content may contain errors or omissions. We reserve the right to correct any errors and update information without notice. We are not liable for any losses or damages arising from such errors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">7. Fair Use Disclaimer</h2>
            <p className="text-theme-secondary leading-relaxed">
              Our website may contain copyrighted material used under fair use for educational and informational purposes. If you believe any content infringes copyright, please contact us immediately for removal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">8. Views Expressed</h2>
            <p className="text-theme-secondary leading-relaxed">
              Views and opinions expressed in our AI prompts, blog posts, or content are those of the authors and do not necessarily reflect the official position of AI Productivity Ecosystem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">9. Consent</h2>
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/30">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-theme-secondary">
                  By using our website, you hereby consent to this disclaimer and agree to its terms. If you do not agree with any part of this disclaimer, please discontinue use of our website.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-theme-primary mb-4">10. Updates to Disclaimer</h2>
            <p className="text-theme-secondary leading-relaxed">
              We may update this disclaimer from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our website after changes indicates acceptance of the updated disclaimer.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-theme-primary mb-4">Contact for Questions</h2>
            <p className="text-theme-secondary leading-relaxed mb-4">
              If you have any questions about this disclaimer, please contact us:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-theme-primary"><strong>Email:</strong> <a href="mailto:legal@aiproductivityecosystem.com" className="text-crimson-500 hover:underline">legal@aiproductivityecosystem.com</a></p>
              <p className="text-theme-primary"><strong>Contact Page:</strong> <Link href="/contact" className="text-crimson-500 hover:underline">Contact Us</Link></p>
            </div>
          </section>

        </div>
      </article>
    </div>
  )
}