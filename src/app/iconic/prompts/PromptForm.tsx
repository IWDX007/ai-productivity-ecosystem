"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPrompt, updatePrompt } from "./actions";
import { Save, ArrowLeft, X } from "lucide-react";
import Link from "next/link";

interface Prompt {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  category: string;
  tags: unknown;
  isActive: boolean | null;
  isFeatured: boolean | null;
}

interface Props {
  prompt?: Prompt;
  categories: string[];
}

export function PromptForm({ prompt, categories }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [tagInput, setTagInput] = useState("");

  const initialTags = Array.isArray(prompt?.tags) ? prompt.tags as string[] : [];

  const [form, setForm] = useState({
    title: prompt?.title || "",
    slug: prompt?.slug || "",
    description: prompt?.description || "",
    content: prompt?.content || "",
    category: prompt?.category || categories[0] || "chatgpt",
    tags: initialTags,
    isActive: prompt?.isActive ?? true,
    isFeatured: prompt?.isFeatured ?? false,
  });

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: !prompt ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : form.slug,
    });
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm({ ...form, tags: [...form.tags, tag] });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setForm({ ...form, tags: form.tags.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    startTransition(async () => {
      try {
        if (prompt) {
          await updatePrompt(prompt.id, form);
          setMessage("Prompt updated successfully!");
        } else {
          await createPrompt(form);
          setMessage("Prompt created successfully!");
        }
        setTimeout(() => router.push("/iconic/prompts"), 1000);
      } catch (err: any) {
        setMessage(`Error: ${err.message || "Something went wrong"}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link href="/iconic/prompts" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        Back to Prompts
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., Professional Email Writer"
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
            placeholder="e.g., professional-email-writer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white capitalize"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="chatgpt">ChatGPT</option>
            <option value="midjourney">Midjourney</option>
            <option value="dalle">DALL-E</option>
            <option value="stable-diffusion">Stable Diffusion</option>
            <option value="claude">Claude</option>
            <option value="gemini">Gemini</option>
            <option value="coding">Coding</option>
            <option value="video">Video</option>
            <option value="music">Music</option>
            <option value="voice">Voice</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Brief description of what this prompt does"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Prompt Content</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prompt Text <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm"
            placeholder="Write the full prompt here. Use [PLACEHOLDER] for variable parts."
          />
          <p className="text-xs text-gray-500 mt-1">{form.content.length} characters</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tags</h2>

        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Type a tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white"
            >
              Add
            </button>
          </div>

          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h2>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
            <p className="text-xs text-gray-500">Prompt is visible on the site</p>
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

      {message && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-900 dark:text-white">
          {message}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isPending ? "Saving..." : prompt ? "Update Prompt" : "Create Prompt"}
        </button>

        <Link
          href="/iconic/prompts"
          className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}