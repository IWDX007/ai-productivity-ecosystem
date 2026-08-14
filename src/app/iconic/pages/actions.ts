"use server";

import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPage(formData: FormData) {
  const slug = (formData.get("slug") as string).toLowerCase().trim().replace(/\s+/g, "-");
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const isActive = formData.get("isActive") === "on";
  const showInFooter = formData.get("showInFooter") === "on";
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  await db.insert(pages).values({
    slug,
    title,
    content,
    metaTitle,
    metaDescription,
    isActive,
    showInFooter,
    sortOrder,
  });

  revalidatePath("/iconic/pages");
  revalidatePath(`/${slug}`);
  redirect("/iconic/pages");
}

export async function updatePage(id: number, formData: FormData) {
  const slug = (formData.get("slug") as string).toLowerCase().trim().replace(/\s+/g, "-");
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const isActive = formData.get("isActive") === "on";
  const showInFooter = formData.get("showInFooter") === "on";
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0;

  await db.update(pages)
    .set({
      slug,
      title,
      content,
      metaTitle,
      metaDescription,
      isActive,
      showInFooter,
      sortOrder,
      updatedAt: new Date(),
    })
    .where(eq(pages.id, id));

  revalidatePath("/iconic/pages");
  revalidatePath(`/${slug}`);
  redirect("/iconic/pages");
}

export async function deletePage(id: number) {
  await db.delete(pages).where(eq(pages.id, id));
  revalidatePath("/iconic/pages");
}

export async function togglePageStatus(id: number, isActive: boolean) {
  await db.update(pages).set({ isActive: !isActive, updatedAt: new Date() }).where(eq(pages.id, id));
  revalidatePath("/iconic/pages");
}