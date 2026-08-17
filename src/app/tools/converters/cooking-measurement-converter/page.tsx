import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import CookingMeasurementConverterClient from "./CookingMeasurementConverterClient";
import SEOSections from "@/components/tools/SEOSections";
import { ToolSchema } from "@/components/seo/SchemaMarkup";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("converters", "cooking-measurement-converter");
  
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
  const tool = await getToolData("converters", "cooking-measurement-converter");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      
      <ToolSchema
        name={tool.name}
        description={tool.metaDescription || tool.description || ""}
        url={`https://ai-productivity-ecosystem-azure.vercel.app/tools/converters/cooking-measurement-converter`}
        category="converters"
        faqs={tool.seoFaqs || undefined}
        steps={tool.seoSteps || undefined}
        rating={tool.seoRating || undefined}
      />
      <CookingMeasurementConverterClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="cooking-measurement-converter" toolName={tool.name} category="converters" />
    </>
  );
}