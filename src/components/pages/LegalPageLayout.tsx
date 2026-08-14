import Link from "next/link";
import { Home, ChevronRight, FileText, Mail, Shield, ScrollText, HelpCircle, AlertTriangle, Cookie } from "lucide-react";

interface Props {
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  children?: React.ReactNode;
}

const pageIcons: Record<string, typeof FileText> = {
  "about": FileText,
  "contact": Mail,
  "privacy-policy": Shield,
  "terms": ScrollText,
  "faq": HelpCircle,
  "disclaimer": AlertTriangle,
  "cookie-policy": Cookie,
};

const pageBadges: Record<string, string> = {
  "about": "About Us",
  "contact": "Get in Touch",
  "privacy-policy": "Privacy",
  "terms": "Legal",
  "faq": "Help Center",
  "disclaimer": "Legal Notice",
  "cookie-policy": "Cookies",
};

const relatedPages = [
  { slug: "about", title: "About Us", icon: FileText },
  { slug: "contact", title: "Contact Us", icon: Mail },
  { slug: "privacy-policy", title: "Privacy Policy", icon: Shield },
  { slug: "terms", title: "Terms of Service", icon: ScrollText },
  { slug: "faq", title: "FAQ", icon: HelpCircle },
  { slug: "disclaimer", title: "Disclaimer", icon: AlertTriangle },
  { slug: "cookie-policy", title: "Cookie Policy", icon: Cookie },
];

export default function LegalPageLayout({ title, slug, content, metaDescription, children }: Props) {
  const badge = pageBadges[slug] || "Page";
  const words = title.split(" ");
  const lastWord = words.pop();
  const firstWords = words.join(" ");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="flex items-center gap-1 hover:text-red-600 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-semibold">{title}</span>
        </nav>
      </div>

      {/* Hero Section - Matching Tool Page Style */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 via-pink-50/30 to-transparent dark:from-red-950/20 dark:via-pink-950/10 dark:to-transparent"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-full border border-red-100 dark:border-red-800/50">
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
            {firstWords ? (
              <>
                {firstWords}{" "}
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  {lastWord}
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                {lastWord}
              </span>
            )}
          </h1>

          {/* Description */}
          {metaDescription && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {metaDescription}
            </p>
          )}
        </div>
        
        {/* Bottom Border Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content Column */}
          <main className="lg:col-span-3 space-y-6">
            {/* Content Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-10 shadow-sm">
              <article
                className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:text-gray-900 dark:prose-headings:text-white 
                  prose-headings:font-bold prose-headings:scroll-mt-24
                  prose-h1:hidden
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:first:mt-0 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-red-600 hover:prose-a:text-red-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                  prose-ul:my-4 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1
                  prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-red-600 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Extra content (Contact form) */}
            {children}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  Quick Links
                </h3>
                <nav className="space-y-1">
                  {relatedPages.map((page) => {
                    const PageIcon = page.icon;
                    const isActive = page.slug === slug;
                    return (
                      <Link
                        key={page.slug}
                        href={`/${page.slug}`}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400 font-semibold border border-red-200 dark:border-red-800/50"
                            : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <PageIcon className={`w-4 h-4 ${isActive ? "text-red-500" : ""}`} />
                        {page.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* CTA Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                  <p className="text-sm text-white/90 mb-4">
                    Have questions? Contact our support team.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Explore Tools */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
                  Explore Tools
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Discover 200+ free online tools for productivity.
                </p>
                <Link
                  href="/tools"
                  className="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1 group"
                >
                  Browse All Tools 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}