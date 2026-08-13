"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "./actions";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  isActive: boolean | null;
}

interface Props {
  category?: Category;
}

const COLOR_OPTIONS = [
  { name: "Red", value: "text-red-500" },
  { name: "Pink", value: "text-pink-500" },
  { name: "Purple", value: "text-purple-500" },
  { name: "Indigo", value: "text-indigo-500" },
  { name: "Blue", value: "text-blue-500" },
  { name: "Cyan", value: "text-cyan-500" },
  { name: "Teal", value: "text-teal-500" },
  { name: "Green", value: "text-green-500" },
  { name: "Yellow", value: "text-yellow-500" },
  { name: "Orange", value: "text-orange-500" },
];

const ICON_OPTIONS = [
  "Type", "Calculator", "Code", "Image", "FileText",
  "QrCode", "Shield", "Repeat", "FolderTree", "Wrench",
  "Zap", "Star", "Search", "Settings", "Database"
];

export function CategoryForm({ category }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    icon: category?.icon || "FolderTree",
    color: category?.color || "text-blue-500",
    isActive: category?.isActive ?? true,
  });

  const handleNameChange = (name: string) => {
    setForm({
      ...form,
      name,
      slug: !category ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : form.slug,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    startTransition(async () => {
      try {
        if (category) {
          await updateCategory(category.id, form);
          setMessage("✅ Category updated successfully!");
        } else {
          await createCategory(form);
          setMessage("✅ Category created successfully!");
        }
        setTimeout(() => router.push("/dashboard/categories"), 1000);
      } catch (err: any) {
        setMessage(`❌ Error: ${err.message || "Something went wrong"}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link href="/dashboard/categories" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="e.g., Text Tools"
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
            placeholder="e.g., text"
          />
          <p className="text-xs text-gray-500 mt-1">URL: /tools/{form.slug}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Brief description of this category"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Icon
          </label>
          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
          >
            {ICON_OPTIONS.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color
          </label>
          <div className="grid grid-cols-5 gap-2">
            {COLOR_OPTIONS.map(c => (
              <button
                key={c.value}
                type="button"
                onClick={() => setForm({ ...form, color: c.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  form.color === c.value
                    ? "border-gray-900 dark:border-white"
                    : "border-transparent"
                }`}
              >
                <div className={`w-full h-6 rounded ${c.value.replace("text-", "bg-")}`} />
                <span className="text-xs text-gray-700 dark:text-gray-300 mt-1 block">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Status</h2>
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
            <p className="text-xs text-gray-500">Show this category on the website</p>
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
          {isPending ? "Saving..." : category ? "Update Category" : "Create Category"}
        </button>

        <Link
          href="/dashboard/categories"
          className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}