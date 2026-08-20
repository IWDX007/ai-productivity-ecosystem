import { redirect, notFound } from "next/navigation";
import { TOOL_CATEGORY_MAP } from "@/lib/toolRedirectMap";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ShortToolRedirectPage({ params }: PageProps) {
  const { slug } = await params;

  const category = TOOL_CATEGORY_MAP[slug];

  if (category) {
    redirect(`/tools/${category}/${slug}`);
  }

  notFound();
}