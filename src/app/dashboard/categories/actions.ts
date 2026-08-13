"use server";

import { db } from "@/lib/db";
import { categories, tools } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleCategoryStatus(id: number, isActive: boolean) {
  await db.update(categories).set({ isActive, updatedAt: new Date() }).where(eq(categories.id, id));
  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function deleteCategory(id: number) {
  const [cat] = await db.select().from(categories).where(eq(categories.id, id));
  if (!cat) throw new Error("Category not found");

  const [toolCount] = await db.select({ count: count() }).from(tools).where(eq(tools.categorySlug, cat.slug));
  if (toolCount.count > 0) {
    throw new Error(`Cannot delete: ${toolCount.count} tools are using this category`);
  }

  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  isActive?: boolean;
}) {
  await db.insert(categories).values({
    name: data.name,
    slug: data.slug,
    description: data.description,
    icon: data.icon,
    color: data.color,
    toolCount: 0,
    isActive: data.isActive ?? true,
    sortOrder: 0,
  });
  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function updateCategory(id: number, data: {
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive?: boolean;
}) {
  await db.update(categories).set({ ...data, updatedAt: new Date() }).where(eq(categories.id, id));
  revalidatePath("/dashboard/categories");
  revalidatePath(`/dashboard/categories/${id}/edit`);
  return { success: true };
}

export async function updateCategoryOrder(id: number, sortOrder: number) {
  await db.update(categories).set({ sortOrder, updatedAt: new Date() }).where(eq(categories.id, id));
  revalidatePath("/dashboard/categories");
  return { success: true };
}