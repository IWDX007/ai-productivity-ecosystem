import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import WordsToNumberClient from "./WordsToNumberClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("text", "words-to-number");
  
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
  const tool = await getToolData("text", "words-to-number");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <WordsToNumberClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="words-to-number" toolName={tool.name} category="text" />
    </>
  );
}