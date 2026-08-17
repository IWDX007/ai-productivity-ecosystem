"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Clock, Calendar, BookOpen, Zap, Shield, Globe } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  categoryId: number | null;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  readingTime: number | null;
  isFeatured: boolean | null;
  publishedAt: Date | null;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  color: string | null;
};

function formatDate(date: Date | null | string) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogListClient({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(p => p.isFeatured);
  const regularPosts = filteredPosts.filter(p => !p.isFeatured);

  const getCategoryName = (id: number | null) => categories.find(c => c.id === id)?.name || "";
  const getCategoryColor = (id: number | null) => categories.find(c => c.id === id)?.color || "#DC2626";

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <section className="relative overflow-hidden border-b border-theme">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-glow text-crimson-500 text-xs font-medium mb-4">
              {posts.length} articles published
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-theme-primary">
              Blog & <span className="gradient-text">Guides</span>
            </h1>
            <p className="text-theme-secondary text-base md:text-lg mb-6">
              Latest tutorials, tips, and guides for productivity tools and AI prompts.
            </p>

            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-secondary" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-card border border-theme rounded-xl text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-crimson-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-6 border-b border-theme">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                  : "glass-card border border-theme text-theme-secondary hover:text-crimson-500"
              }`}
            >
              All Posts ({posts.length})
            </button>
            {categories.map(cat => {
              const count = posts.filter(p => p.categoryId === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "text-white shadow-md"
                      : "glass-card border border-theme text-theme-secondary hover:text-crimson-500"
                  }`}
                  style={selectedCategory === cat.id ? { background: cat.color || "#DC2626" } : {}}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </section>
      )}

      {featuredPosts.length > 0 && !searchQuery && selectedCategory === "all" && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-crimson-500" />
            <h2 className="text-xl font-bold text-theme-primary">Featured Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <PostCard key={post.id} post={post} categoryName={getCategoryName(post.categoryId)} categoryColor={getCategoryColor(post.categoryId)} featured />
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-theme-primary">
              {searchQuery ? "Search Results" : selectedCategory === "all" ? "Latest Articles" : "Filtered Posts"}
            </h2>
            <p className="text-sm text-theme-secondary">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} {searchQuery ? "found" : "available"}
            </p>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 glass-card border border-theme rounded-xl">
            <Search className="w-12 h-12 text-theme-muted mx-auto mb-3" />
            <p className="text-theme-primary font-semibold mb-1">No articles found</p>
            <p className="text-sm text-theme-secondary">
              {posts.length === 0 ? "No posts published yet. Check back soon!" : "Try a different search term or category"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchQuery || selectedCategory !== "all" ? filteredPosts : regularPosts).map(post => (
              <PostCard key={post.id} post={post} categoryName={getCategoryName(post.categoryId)} categoryColor={getCategoryColor(post.categoryId)} />
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 border-t border-theme">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-3">Why Read Our Blog?</h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Practical guides and tutorials to help you get the most out of our tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 glass-card border border-theme rounded-xl card-hover text-center">
            <div className="w-12 h-12 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Practical Tips</h3>
            <p className="text-sm text-theme-secondary">Real-world tips you can apply immediately.</p>
          </div>
          <div className="p-6 glass-card border border-theme rounded-xl card-hover text-center">
            <div className="w-12 h-12 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Step-by-Step Guides</h3>
            <p className="text-sm text-theme-secondary">Detailed tutorials with clear examples.</p>
          </div>
          <div className="p-6 glass-card border border-theme rounded-xl card-hover text-center">
            <div className="w-12 h-12 rounded-lg bg-crimson-500/10 border border-crimson-500/20 flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-crimson-500" />
            </div>
            <h3 className="text-theme-primary font-semibold mb-2">Always Free</h3>
            <p className="text-sm text-theme-secondary">All content freely available. No paywall.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 border-t border-theme">
        <div className="glass-card border border-theme rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-theme-primary mb-2">Explore Our Tools</h3>
          <p className="text-theme-secondary mb-6">
            Browse 200+ free online tools to boost your productivity
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 btn-primary border-0 px-6 py-3 rounded-xl font-medium"
          >
            View All Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function PostCard({ post, categoryName, categoryColor, featured }: { post: Post; categoryName: string; categoryColor: string; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block glass-card border border-theme rounded-xl overflow-hidden card-hover ${featured ? "ring-2 ring-crimson-500" : ""}`}
    >
      {post.featuredImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold">
          {post.title.charAt(0)}
        </div>
      )}
      
      <div className="p-5">
        {categoryName && (
          <span
            className="inline-block px-3 py-1 text-xs rounded-full text-white font-medium mb-3"
            style={{ background: categoryColor }}
          >
            {categoryName}
          </span>
        )}
        
        <h3 className="text-theme-primary font-bold text-lg mb-2 group-hover:text-crimson-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="text-theme-secondary text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-3 text-xs text-theme-muted pt-3 border-t border-theme">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readingTime}m read
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}