import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import UpcaBarcodeGeneratorClient from "./UpcaBarcodeGeneratorClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("qr-barcode", "upca-barcode-generator");
  
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
  const tool = await getToolData("qr-barcode", "upca-barcode-generator");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <UpcaBarcodeGeneratorClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="upca-barcode-generator" toolName={tool.name} category="qr-barcode" />
    </>
  );
}