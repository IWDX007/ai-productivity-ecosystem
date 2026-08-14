import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import Ean13BarcodeGeneratorClient from "./Ean13BarcodeGeneratorClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("qr-barcode", "ean13-barcode-generator");
  
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
  const tool = await getToolData("qr-barcode", "ean13-barcode-generator");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <Ean13BarcodeGeneratorClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="ean13-barcode-generator" toolName={tool.name} category="qr-barcode" />
    </>
  );
}