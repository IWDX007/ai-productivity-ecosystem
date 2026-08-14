"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, FolderTree, Search } from "lucide-react";
import { toggleCategoryStatus, deleteCategory } from "./actions";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  toolCount: number | null;
  isActive: boolean | null;
  sortOrder: number | null;
}

interface Props {
  initialCategories: Category[];
  toolCounts: Record<string, number>;
}

export function CategoriesTable({ initialCategories, toolCounts }: Props) {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (id: number, current: boolean) => {
    startTransition(async () => {
      await toggleCategoryStatus(id, !current);
      setCategories(categories.map(c => c.id === id ? { ...c, isActive: !current } : c));
    });
  };

  const handleDelete = (id: number, name: string, slug: string) => {
    const count = toolCounts[slug] || 0;
    if (count > 0) {
      alert(`Cannot delete "${name}": ${count} tools are using this category. Move or delete tools first.`);
      return;
    }
    if (!confirm(`Delete category "${name}"? This cannot be undone.`)) return;

    startTransition(async () => {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <Link
            href="/iconic/categories/new"
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </Link>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Total: {categories.length} categories
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cat) => {
          const toolsInCat = toolCounts[cat.slug] || 0;
          return (
            <div
              key={cat.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${cat.color || "bg-gray-500"} bg-opacity-20`}>
                  <FolderTree className={`w-6 h-6 ${cat.color || "text-gray-500"}`} />
                </div>

                <button
                  onClick={() => handleToggle(cat.id, cat.isActive ?? false)}
                  disabled={isPending}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    cat.isActive ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    cat.isActive ? "translate-x-6" : "translate-x-1"
                  }`} />
                </button>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{cat.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">/{cat.slug}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {cat.description || "No description"}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">{toolsInCat}</span> tools
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/iconic/categories/${cat.id}/edit`}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name, cat.slug)}
                    disabled={isPending}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 rounded-xl">
          No categories found.
        </div>
      )}
    </div>
  );
}