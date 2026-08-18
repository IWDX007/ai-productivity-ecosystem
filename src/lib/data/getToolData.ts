import { db } from "@/lib/db";
import { tools, categories } from "@/lib/db/schema";
import { eq, and, ne, sql } from "drizzle-orm";
import { cache } from "react";

export const getToolData = cache(async (categorySlug: string, toolSlug: string) => {
  const [tool] = await db
    .select()
    .from(tools)
    .where(and(eq(tools.categorySlug, categorySlug), eq(tools.slug, toolSlug)))
    .limit(1);
  return tool || null;
});

export const getCategoryData = cache(async (slug: string) => {
  const [cat] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);
  return cat || null;
});

export const getAllActiveTools = cache(async () => {
  return await db
    .select()
    .from(tools)
    .where(eq(tools.isActive, true));
});

// Get related tools from same category (excluding current)
export const getRelatedToolsByCategory = cache(
  async (categorySlug: string, currentToolSlug: string, limit: number = 6) => {
    const results = await db
      .select({
        slug: tools.slug,
        name: tools.name,
        description: tools.description,
        category_slug: tools.categorySlug,
      })
      .from(tools)
      .where(
        and(
          eq(tools.categorySlug, categorySlug),
          ne(tools.slug, currentToolSlug),
          eq(tools.isActive, true)
        )
      )
      .limit(limit);
    return results;
  }
);

// Get all categories with tool count
export const getAllCategoriesWithCount = cache(async () => {
  const results = await db
    .select({
      slug: categories.slug,
      name: categories.name,
      description: categories.description,
      toolCount: sql<number>`(
        SELECT COUNT(*)::int FROM ${tools} 
        WHERE ${tools.categorySlug} = ${categories.slug} 
        AND ${tools.isActive} = true
      )`,
    })
    .from(categories);
  return results;
});