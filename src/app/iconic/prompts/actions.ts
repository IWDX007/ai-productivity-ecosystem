"use server";

import { db } from "@/lib/db";
import { prompts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function togglePromptStatus(id: number, isActive: boolean) {
  await db.update(prompts).set({ isActive, updatedAt: new Date() }).where(eq(prompts.id, id));
  revalidatePath("/iconic/prompts");
  return { success: true };
}

export async function togglePromptFeatured(id: number, isFeatured: boolean) {
  await db.update(prompts).set({ isFeatured, updatedAt: new Date() }).where(eq(prompts.id, id));
  revalidatePath("/iconic/prompts");
  return { success: true };
}

export async function deletePrompt(id: number) {
  await db.delete(prompts).where(eq(prompts.id, id));
  revalidatePath("/iconic/prompts");
  return { success: true };
}

export async function createPrompt(data: {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}) {
  await db.insert(prompts).values({
    title: data.title,
    slug: data.slug,
    description: data.description,
    content: data.content,
    category: data.category,
    tags: data.tags,
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? false,
    usageCount: 0,
  });
  revalidatePath("/iconic/prompts");
  return { success: true };
}

export async function updatePrompt(id: number, data: {
  title?: string;
  slug?: string;
  description?: string;
  content?: string;
  category?: string;
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}) {
  await db.update(prompts).set({ ...data, updatedAt: new Date() }).where(eq(prompts.id, id));
  revalidatePath("/iconic/prompts");
  revalidatePath(`/iconic/prompts/${id}/edit`);
  return { success: true };
}