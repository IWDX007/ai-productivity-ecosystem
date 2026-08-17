import PostForm from "../../PostForm";
import { getAllBlogCategories, getPostById } from "../../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);
  
  const [post, categories] = await Promise.all([
    getPostById(postId),
    getAllBlogCategories(),
  ]);

  if (!post) notFound();

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
          <h1 className="text-2xl font-bold">Edit Post</h1>
          <p className="text-gray-500">{post.title}</p>
        </div>
      </div>

      <PostForm 
        post={{ 
          ...post, 
          excerpt: post.excerpt || undefined,
          categoryId: post.categoryId || undefined,
          featuredImage: post.featuredImage || undefined,
          featuredImageAlt: post.featuredImageAlt || undefined,
          author: post.author || undefined,
          metaTitle: post.metaTitle || undefined,
          metaDescription: post.metaDescription || undefined,
          focusKeyword: post.focusKeyword || undefined,
          keywords: post.keywords || undefined,
          readingTime: post.readingTime || 5,
          isPublished: post.isPublished || false,
          isFeatured: post.isFeatured || false,
        }} 
        categories={categories} 
        isEdit 
      />
    </div>
  );
}