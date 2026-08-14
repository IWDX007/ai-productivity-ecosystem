import { db } from "@/lib/db";
import { tools, categories } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
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