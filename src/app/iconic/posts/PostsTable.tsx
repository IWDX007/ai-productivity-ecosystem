"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deletePost, togglePublish, toggleFeatured } from "./actions";
import { Edit, Trash2, Eye, EyeOff, Star, StarOff, ExternalLink } from "lucide-react";

type Post = {
  id: number;
  title: string;
  slug: string;
  categoryId: number | null;
  isPublished: boolean | null;
  isFeatured: boolean | null;
  viewCount: number | null;
  createdAt: Date | null;
};

type Category = {
  id: number;
  name: string;
  color: string | null;
};

export default function PostsTable({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const getCategoryName = (id: number | null) => {
    if (!id) return "-";
    return categories.find(c => c.id === id)?.name || "-";
  };

  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deletePost(id);
      router.refresh();
    });
  };

  const handleTogglePublish = (id: number, current: boolean) => {
    startTransition(async () => {
      await togglePublish(id, !current);
      router.refresh();
    });
  };

  const handleToggleFeatured = (id: number, current: boolean) => {
    startTransition(async () => {
      await toggleFeatured(id, !current);
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
      />

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left px-4 py-3 text-sm">Title</th>
              <th className="text-left px-4 py-3 text-sm">Category</th>
              <th className="text-left px-4 py-3 text-sm">Status</th>
              <th className="text-left px-4 py-3 text-sm">Views</th>
              <th className="text-right px-4 py-3 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No posts yet. <Link href="/iconic/posts/new" className="text-red-600 hover:underline">Create your first post</Link>
                </td>
              </tr>
            ) : (
              filtered.map((post) => (
                <tr key={post.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-xs text-gray-500 font-mono">/blog/{post.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{getCategoryName(post.categoryId)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(post.id, post.isPublished || false)}
                        disabled={isPending}
                        className={`px-2 py-1 text-xs rounded-full ${
                          post.isPublished 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {post.isPublished ? "Published" : "Draft"}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(post.id, post.isFeatured || false)}
                        disabled={isPending}
                        title={post.isFeatured ? "Unfeature" : "Feature"}
                      >
                        {post.isFeatured 
                          ? <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 
                          : <StarOff className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{post.viewCount || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      {post.isPublished && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          title="View"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/iconic/posts/${post.id}/edit`}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={isPending}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}