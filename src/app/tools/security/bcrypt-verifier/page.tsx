import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import BcryptVerifierClient from "./BcryptVerifierClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("security", "bcrypt-verifier");
  
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
  const tool = await getToolData("security", "bcrypt-verifier");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <BcryptVerifierClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="bcrypt-verifier" toolName={tool.name} category="security" />
    </>
  );
}