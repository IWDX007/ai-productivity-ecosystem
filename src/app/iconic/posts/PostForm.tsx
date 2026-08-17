"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost, PostFormData } from "./actions";
import { Loader2, Save, Eye } from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Post = PostFormData & { id?: number };

export default function PostForm({ 
  post, 
  categories,
  isEdit = false 
}: { 
  post?: Post; 
  categories: Category[];
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    categoryId: post?.categoryId,
    featuredImage: post?.featuredImage || "",
    featuredImageAlt: post?.featuredImageAlt || "",
    author: post?.author || "Iconic Usama",
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
    focusKeyword: post?.focusKeyword || "",
    keywords: post?.keywords || "",
    readingTime: post?.readingTime || 5,
    isPublished: post?.isPublished || false,
    isFeatured: post?.isFeatured || false,
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: slugManuallyEdited ? formData.slug : generateSlug(title),
      metaTitle: formData.metaTitle || title,
    });
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setFormData({ ...formData, slug: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    startTransition(async () => {
      const result = isEdit && post?.id
        ? await updatePost(post.id, formData)
        : await createPost(formData);
      
      if (result.success) {
        router.push("/iconic/posts");
        router.refresh();
      } else {
        setError(result.error || "Failed to save post");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
              placeholder="10 Best Free Text Tools in 2026"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 font-mono text-sm"
              placeholder="10-best-free-text-tools-2026"
            />
            <p className="text-xs text-gray-500 mt-1">URL: /blog/{formData.slug}</p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Short description shown in list view..."
            />
          </div>

          {/* Content HTML */}
          <div>
            <label className="block text-sm font-medium mb-2">Content (HTML) *</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 font-mono text-sm"
              placeholder="<h2>Introduction</h2><p>Your content here...</p>"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use HTML tags: h2, h3, p, ul, ol, li, strong, em, a, img, blockquote
            </p>
          </div>

          {/* SEO Section */}
          <div className="p-4 border-2 border-blue-200 dark:border-blue-800 rounded-lg space-y-4">
            <h3 className="font-semibold text-blue-700 dark:text-blue-400">SEO Settings</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.metaTitle?.length || 0}/60 chars</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.metaDescription?.length || 0}/160 chars</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Focus Keyword</label>
                <input
                  type="text"
                  value={formData.focusKeyword}
                  onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Keywords (comma)</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                  placeholder="tools, free, online"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg space-y-3">
            <h3 className="font-semibold">Publish</h3>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Publish (make live)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Featured post</span>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isEdit ? "Update Post" : "Create Post"}
            </button>
          </div>

          {/* Category */}
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.categoryId || ""}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg space-y-3">
            <h3 className="font-semibold">Featured Image</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Alt Text</label>
              <input
                type="text"
                value={formData.featuredImageAlt}
                onChange={(e) => setFormData({ ...formData, featuredImageAlt: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
              />
            </div>

            {formData.featuredImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={formData.featuredImage} alt="Preview" className="w-full rounded-lg" />
            )}
          </div>

          {/* Meta */}
          <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg space-y-3">
            <h3 className="font-semibold">Meta</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reading Time (min)</label>
              <input
                type="number"
                value={formData.readingTime}
                onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) || 5 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
                min={1}
                max={60}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}