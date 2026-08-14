"use client";

import { useState } from "react";

interface PageData {
  id?: number;
  slug?: string;
  title?: string;
  content?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isActive?: boolean | null;
  showInFooter?: boolean | null;
  sortOrder?: number | null;
}

interface Props {
  page?: PageData;
  action: (formData: FormData) => Promise<void>;
  isEdit?: boolean;
}

export default function PageForm({ page, action, isEdit = false }: Props) {
  const [title, setTitle] = useState(page?.title || "");
  const [slug, setSlug] = useState(page?.slug || "");
  const [content, setContent] = useState(page?.content || "");

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit || !slug) {
      setSlug(val.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
    }
  };

  return (
    <form action={action} className="space-y-6">
      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Page Title *
          </label>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="About Us"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            URL Slug *
          </label>
          <input
            type="text"
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="about-us"
          />
          <p className="text-xs text-gray-500 mt-1">URL: /{slug || "your-page-slug"}</p>
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Page Content (HTML supported)
        </label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
          placeholder="<h1>Page Title</h1>&#10;<p>Your content here...</p>"
        />
        <p className="text-xs text-gray-500 mt-1">Tip: Use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;a&gt; for formatting</p>
      </div>

      {/* SEO Fields */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">SEO Settings</h3>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Meta Title
          </label>
          <input
            type="text"
            name="metaTitle"
            defaultValue={page?.metaTitle || ""}
            maxLength={60}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Page Title | Site Name (max 60 chars)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            defaultValue={page?.metaDescription || ""}
            maxLength={160}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Short description for search engines (max 160 chars)"
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={page?.isActive ?? true}
            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Active (visible on site)</span>
        </label>

        <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
          <input
            type="checkbox"
            name="showInFooter"
            defaultChecked={page?.showInFooter ?? false}
            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Show in Footer</span>
        </label>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Sort Order
          </label>
          <input
            type="number"
            name="sortOrder"
            defaultValue={page?.sortOrder ?? 0}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
        >
          {isEdit ? "Update Page" : "Create Page"}
        </button>
        <a
          href="/iconic/pages"
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}