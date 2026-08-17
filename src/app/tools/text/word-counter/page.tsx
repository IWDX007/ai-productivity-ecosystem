import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import WordCounterClient from "./WordCounterClient";
import SEOSections from "@/components/tools/SEOSections";
import { ToolSchema } from "@/components/seo/SchemaMarkup";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("text", "word-counter");
  
  if (!tool) {
    return {
      title: "Word Counter",
      description: "Count words, characters, sentences",
    };
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
  const tool = await getToolData("text", "word-counter");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      
      <ToolSchema
        name={tool.name}
        description={tool.metaDescription || tool.description || ""}
        url={`https://ai-productivity-ecosystem-azure.vercel.app/tools/text/word-counter`}
        category="text"
        faqs={tool.seoFaqs || undefined}
        steps={tool.seoSteps || undefined}
        rating={tool.seoRating || undefined}
      />
      <WordCounterClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="word-counter" toolName={tool.name} category="text" />
    </>
  );
}