import { db } from "@/lib/db";
import { pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 0;
import LegalPageLayout from "@/components/pages/LegalPageLayout";


const PAGE_SLUG = "terms";

export async function generateMetadata(): Promise<Metadata> {
  const [pageData] = await db.select().from(pages).where(eq(pages.slug, PAGE_SLUG));
  if (!pageData) return { title: "Page Not Found" };
  return {
    title: pageData.metaTitle || pageData.title,
    description: pageData.metaDescription || undefined,
  };
}

export default async function Page() {
  const [pageData] = await db.select().from(pages).where(eq(pages.slug, PAGE_SLUG));
  
  if (!pageData || !pageData.isActive) {
    notFound();
  }
  
  return (
    <>
      <LegalPageLayout
        title={pageData.title}
        slug={pageData.slug}
        content={pageData.content || ""}
        metaDescription={pageData.metaDescription || undefined}
      />
      
    </>
  );
}