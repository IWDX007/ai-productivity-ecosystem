"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTool, updateTool } from "./actions";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  categorySlug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  isActive: boolean | null;
  isFeatured: boolean | null;
}

interface Props {
  tool?: Tool;
  categories: { slug: string; name: string }[];
}

export function ToolForm({ tool, categories }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: tool?.name || "",
    slug: tool?.slug || "",
    description: tool?.description || "",
    categorySlug: tool?.categorySlug || categories[0]?.slug || "",
    metaTitle: tool?.metaTitle || "",
    metaDescription: tool?.metaDescription || "",
    focusKeyword: tool?.focusKeyword || "",
    isActive: tool?.isActive ?? true,
    isFeatured: tool?.isFeatured ?? false,
  });

  const handleNameChange = (name: string) => {
    setForm({
      ...form,
      name,
      slug: !tool ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : form.slug,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    startTransition(async () => {
      try {
        if (tool) {
          await updateTool(tool.id, form);
          setMessage("✅ Tool updated successfully!");
          setTimeout(() => router.push("/dashboard/tools"), 1000);
        } else {
          await createTool(form);
          setMessage("✅ Tool created successfully!");
          setTimeout(() => router.push("/dashboard/tools"), 1000);
        }
      } catch (err: any) {
        setMessage(`❌ Error: ${err.message || "Something went wrong"}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link href="/dashboard/tools" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      {/* Basic Info */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tool Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., Word Counter"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm"
            placeholder="e.g., word-counter"
          />
          <p className="text-xs text-gray-500 mt-1">URL: /tools/{form.categorySlug}/{form.slug}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.categorySlug}
            onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
          >
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Brief description of what this tool does"
          />
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">SEO Settings</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Focus Keyword
          </label>
          <input
            type="text"
            value={form.focusKeyword}
            onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., word counter online"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            maxLength={60}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Optimized title for search engines"
          />
          <p className="text-xs text-gray-500 mt-1">{form.metaTitle.length}/60 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meta Description
          </label>
          <textarea
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            rows={3}
            maxLength={160}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Brief description shown in search results"
          />
          <p className="text-xs text-gray-500 mt-1">{form.metaDescription.length}/160 characters</p>
        </div>
      </div>

      {/* Status Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h2>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
            <p className="text-xs text-gray-500">Tool is visible on the site</p>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...form, isActive: !form.isActive })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.isActive ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              form.isActive ? "translate-x-6" : "translate-x-1"
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</label>
            <p className="text-xs text-gray-500">Show in featured section</p>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.isFeatured ? "bg-yellow-500" : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              form.isFeatured ? "translate-x-6" : "translate-x-1"
            }`} />
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-900 dark:text-white">
          {message}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Saving..." : tool ? "Update Tool" : "Create Tool"}
        </button>

        <Link
          href="/dashboard/tools"
          className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}