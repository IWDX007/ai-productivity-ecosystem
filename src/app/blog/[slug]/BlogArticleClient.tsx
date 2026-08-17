"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, ChevronRight, Clock, Calendar, BookOpen, ArrowRight, Eye } from "lucide-react";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  readingTime: number | null;
  publishedAt: Date | null;
  viewCount: number | null;
  categoryId: number | null;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  color: string | null;
} | undefined;

type TocItem = { id: string; text: string; level: number; };

function formatDate(date: Date | null | string) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function processContent(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();
  
  const processedHtml = html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    const cleanText = text.replace(/<[^>]+>/g, "").trim();
    let id = cleanText.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    
    let uniqueId = id;
    let counter = 1;
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${counter}`;
      counter++;
    }
    usedIds.add(uniqueId);
    
    toc.push({ id: uniqueId, text: cleanText, level: parseInt(level) });
    return `<h${level} id="${uniqueId}"${attrs}>${text}</h${level}>`;
  });
  
  return { html: processedHtml, toc };
}

export default function BlogArticleClient({ 
  post, category, relatedPosts, allCategories
}: { 
  post: Post; 
  category: Category; 
  relatedPosts: Post[];
  allCategories: { id: number; name: string; color: string | null; }[];
}) {
  const { html: processedContent, toc } = processContent(post.content);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map(t => document.getElementById(t.id)).filter(Boolean);
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = headings[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-red-600 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-red-600 transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-semibold line-clamp-1">{post.title}</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 via-pink-50/30 to-transparent dark:from-red-950/20 dark:via-pink-950/10 dark:to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          {category && (
            <div
              className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold rounded-full text-white shadow-sm"
              style={{ background: category.color || "#DC2626" }}
            >
              {category.name}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight max-w-4xl mx-auto leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {post.viewCount || 0} views
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3 space-y-6">
            {post.featuredImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="w-full rounded-2xl shadow-lg"
              />
            )}

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
                  prose-img:rounded-lg
                  prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:text-red-600 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>

            {relatedPosts.length > 0 && (
              <div className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map(rp => {
                    const rpCat = allCategories.find(c => c.id === rp.categoryId);
                    return (
                      <Link
                        key={rp.id}
                        href={`/blog/${rp.slug}`}
                        className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-red-300 dark:hover:border-red-800 transition-all"
                      >
                        {rp.featuredImage ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={rp.featuredImage} alt={rp.title} className="w-full h-32 object-cover" />
                        ) : (
                          <div className="w-full h-32 bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                            {rp.title.charAt(0)}
                          </div>
                        )}
                        <div className="p-4">
                          {rpCat && (
                            <span className="text-xs font-medium" style={{ color: rpCat.color || "#DC2626" }}>
                              {rpCat.name}
                            </span>
                          )}
                          <h3 className="font-bold mt-1 text-gray-900 dark:text-white group-hover:text-red-600 line-clamp-2 text-sm">
                            {rp.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              {toc.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-red-500" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-1 max-h-96 overflow-y-auto">
                    {toc.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-600 dark:text-red-400 font-semibold border-l-2 border-red-500"
                            : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        } ${item.level === 3 ? "pl-6" : ""}`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              )}

              <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <h3 className="font-bold text-lg mb-2">Explore Our Tools</h3>
                  <p className="text-sm text-white/90 mb-4">
                    Discover 200+ free online tools.
                  </p>
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm shadow-sm"
                  >
                    Browse Tools
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {allCategories.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xs uppercase tracking-wider">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {allCategories.map(cat => (
                      <Link
                        key={cat.id}
                        href="/blog"
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: cat.color || "#DC2626" }}></span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/blog"
                className="block text-center text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400"
              >
                ← Back to Blog
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}