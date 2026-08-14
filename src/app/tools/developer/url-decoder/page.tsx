import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import UrlDecoderClient from "./UrlDecoderClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("developer", "url-decoder");
  
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
  const tool = await getToolData("developer", "url-decoder");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <UrlDecoderClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="url-decoder" toolName={tool.name} category="developer" />
    </>
  );
}