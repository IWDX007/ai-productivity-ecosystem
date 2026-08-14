"use server";

import { db } from "@/lib/db";
import { tools, prompts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateToolSEO(id: number, data: {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  seoScore: number;
}) {
  await db.update(tools).set({ ...data, updatedAt: new Date() }).where(eq(tools.id, id));
  revalidatePath("/iconic/seo");
  revalidatePath(`/iconic/seo/tool/${id}`);
  return { success: true };
}

export async function updatePromptSEO(id: number, data: {
  title?: string;
  description: string;
}) {
  await db.update(prompts).set({ ...data, updatedAt: new Date() }).where(eq(prompts.id, id));
  revalidatePath("/iconic/seo");
  revalidatePath(`/iconic/seo/prompt/${id}`);
  return { success: true };
}