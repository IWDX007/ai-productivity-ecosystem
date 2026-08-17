"use server";

import { db } from "@/lib/db";
import { posts, blogCategories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type PostFormData = {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  categoryId?: number;
  featuredImage?: string;
  featuredImageAlt?: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  keywords?: string;
  readingTime?: number;
  isPublished?: boolean;
  isFeatured?: boolean;
};

export async function getAllPosts() {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getPostById(id: number) {
  const result = await db.select().from(posts).where(eq(posts.id, id));
  return result[0];
}

export async function getAllBlogCategories() {
  return await db.select().from(blogCategories).orderBy(blogCategories.sortOrder);
}

export async function createPost(data: PostFormData) {
  try {
    const publishedAt = data.isPublished ? new Date() : null;
    
    await db.insert(posts).values({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      categoryId: data.categoryId,
      featuredImage: data.featuredImage,
      featuredImageAlt: data.featuredImageAlt,
      author: data.author || "Iconic Usama",
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      focusKeyword: data.focusKeyword,
      keywords: data.keywords,
      readingTime: data.readingTime || 5,
      isPublished: data.isPublished || false,
      isFeatured: data.isFeatured || false,
      publishedAt,
    });
    
    revalidatePath("/iconic/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updatePost(id: number, data: PostFormData) {
  try {
    const existing = await getPostById(id);
    const publishedAt = data.isPublished && !existing?.publishedAt ? new Date() : existing?.publishedAt;
    
    await db.update(posts).set({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      categoryId: data.categoryId,
      featuredImage: data.featuredImage,
      featuredImageAlt: data.featuredImageAlt,
      author: data.author,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      focusKeyword: data.focusKeyword,
      keywords: data.keywords,
      readingTime: data.readingTime,
      isPublished: data.isPublished,
      isFeatured: data.isFeatured,
      publishedAt,
      updatedAt: new Date(),
    }).where(eq(posts.id, id));
    
    revalidatePath("/iconic/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deletePost(id: number) {
  try {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath("/iconic/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function togglePublish(id: number, isPublished: boolean) {
  try {
    const publishedAt = isPublished ? new Date() : null;
    await db.update(posts).set({ 
      isPublished, 
      publishedAt,
      updatedAt: new Date() 
    }).where(eq(posts.id, id));
    revalidatePath("/iconic/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleFeatured(id: number, isFeatured: boolean) {
  try {
    await db.update(posts).set({ 
      isFeatured, 
      updatedAt: new Date() 
    }).where(eq(posts.id, id));
    revalidatePath("/iconic/posts");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}