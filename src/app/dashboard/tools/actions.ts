"use server";

import { db } from "@/lib/db";
import { tools } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleToolStatus(id: number, isActive: boolean) {
  await db.update(tools).set({ isActive, updatedAt: new Date() }).where(eq(tools.id, id));
  revalidatePath("/dashboard/tools");
  return { success: true };
}

export async function toggleToolFeatured(id: number, isFeatured: boolean) {
  await db.update(tools).set({ isFeatured, updatedAt: new Date() }).where(eq(tools.id, id));
  revalidatePath("/dashboard/tools");
  return { success: true };
}

export async function deleteTool(id: number) {
  await db.delete(tools).where(eq(tools.id, id));
  revalidatePath("/dashboard/tools");
  return { success: true };
}

export async function createTool(data: {
  name: string;
  slug: string;
  description: string;
  categorySlug: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}) {
  await db.insert(tools).values({
    name: data.name,
    slug: data.slug,
    description: data.description,
    categorySlug: data.categorySlug,
    metaTitle: data.metaTitle || data.name,
    metaDescription: data.metaDescription || data.description,
    focusKeyword: data.focusKeyword || data.name.toLowerCase(),
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? false,
    tags: [],
    seoScore: 0,
    sortOrder: 0,
  });
  revalidatePath("/dashboard/tools");
  return { success: true };
}

export async function updateTool(id: number, data: {
  name?: string;
  slug?: string;
  description?: string;
  categorySlug?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}) {
  await db.update(tools).set({ ...data, updatedAt: new Date() }).where(eq(tools.id, id));
  revalidatePath("/dashboard/tools");
  revalidatePath(`/dashboard/tools/${id}/edit`);
  return { success: true };
}