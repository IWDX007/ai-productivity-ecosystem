import Link from "next/link";
import { getAllPosts, getAllBlogCategories } from "./actions";
import PostsTable from "./PostsTable";
import { Plus } from "lucide-react";

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllBlogCategories(),
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-gray-500">Manage all blog posts ({posts.length} total)</p>
        </div>
        <Link
          href="/iconic/posts/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <PostsTable posts={posts} categories={categories} />
    </div>
  );
}