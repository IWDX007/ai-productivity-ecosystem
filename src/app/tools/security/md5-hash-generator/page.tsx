import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import Md5HashGeneratorClient from "./Md5HashGeneratorClient";
import SEOSections from "@/components/tools/SEOSections";
import { ToolSchema } from "@/components/seo/SchemaMarkup";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("security", "md5-hash-generator");
  
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
  const tool = await getToolData("security", "md5-hash-generator");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      
      <ToolSchema
        name={tool.name}
        description={tool.metaDescription || tool.description || ""}
        url={`https://ai-productivity-ecosystem-azure.vercel.app/tools/security/md5-hash-generator`}
        category="security"
        faqs={tool.seoFaqs || undefined}
        steps={tool.seoSteps || undefined}
        rating={tool.seoRating || undefined}
      />
      <Md5HashGeneratorClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="md5-hash-generator" toolName={tool.name} category="security" />
    </>
  );
}