import { db } from "@/lib/db";
import { posts, blogCategories } from "@/lib/db/schema";
import { eq, desc, and, ne } from "drizzle-orm";

export async function getPublishedPosts() {
  return await db.select().from(posts)
    .where(eq(posts.isPublished, true))
    .orderBy(desc(posts.publishedAt));
}

export async function getPostBySlug(slug: string) {
  const result = await db.select().from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.isPublished, true)));
  return result[0];
}

export async function getRelatedPosts(currentId: number, categoryId: number | null, limit = 3) {
  if (!categoryId) {
    return await db.select().from(posts)
      .where(and(eq(posts.isPublished, true), ne(posts.id, currentId)))
      .orderBy(desc(posts.publishedAt))
      .limit(limit);
  }
  return await db.select().from(posts)
    .where(and(
      eq(posts.isPublished, true),
      eq(posts.categoryId, categoryId),
      ne(posts.id, currentId)
    ))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}

export async function getBlogCategoryById(id: number | null) {
  if (!id) return null;
  const result = await db.select().from(blogCategories)
    .where(eq(blogCategories.id, id));
  return result[0];
}

export async function getAllPublishedCategories() {
  return await db.select().from(blogCategories)
    .where(eq(blogCategories.isActive, true))
    .orderBy(blogCategories.sortOrder);
}