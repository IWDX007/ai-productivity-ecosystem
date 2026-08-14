import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import SqlFormatterClient from "./SqlFormatterClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("developer", "sql-formatter");
  
  if (!tool) {
    return { title: "Tool Not Found" };
  }

  return {
    title: tool.metaTitle || tool.name,
    description: tool.metaDescription || tool.description || "",
    keywords: tool.focusKeyword || undefined,
    openGraph: {
      title: tool.metaTitle || tool.name,
      description: tool.metaDescription || tool.description || "",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle || tool.name,
      description: tool.metaDescription || tool.description || "",
    },
  };
}

export default async function Page() {
  const tool = await getToolData("developer", "sql-formatter");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <SqlFormatterClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="sql-formatter" toolName={tool.name} category="developer" />
    </>
  );
}