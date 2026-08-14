import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import DataStorageConverterClient from "./DataStorageConverterClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("converters", "data-storage-converter");
  
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
  const tool = await getToolData("converters", "data-storage-converter");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <DataStorageConverterClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="data-storage-converter" toolName={tool.name} category="converters" />
    </>
  );
}