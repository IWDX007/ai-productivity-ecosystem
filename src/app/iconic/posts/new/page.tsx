import PostForm from "../PostForm";
import { getAllBlogCategories } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewPostPage() {
  const categories = await getAllBlogCategories();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/iconic/posts"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">New Blog Post</h1>
          <p className="text-gray-500">Create a new blog article</p>
        </div>
      </div>

      <PostForm categories={categories} />
    </div>
  );
}