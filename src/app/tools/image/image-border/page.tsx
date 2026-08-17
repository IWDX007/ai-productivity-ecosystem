import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import ImageBorderClient from "./ImageBorderClient";
import SEOSections from "@/components/tools/SEOSections";
import { ToolSchema } from "@/components/seo/SchemaMarkup";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("image", "image-border");
  
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
  const tool = await getToolData("image", "image-border");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      
      <ToolSchema
        name={tool.name}
        description={tool.metaDescription || tool.description || ""}
        url={`https://ai-productivity-ecosystem-azure.vercel.app/tools/image/image-border`}
        category="image"
        faqs={tool.seoFaqs || undefined}
        steps={tool.seoSteps || undefined}
        rating={tool.seoRating || undefined}
      />
      <ImageBorderClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="image-border" toolName={tool.name} category="image" />
    </>
  );
}