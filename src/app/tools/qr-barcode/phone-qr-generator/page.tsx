import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import PhoneQrGeneratorClient from "./PhoneQrGeneratorClient";
import SEOSections from "@/components/tools/SEOSections";
import { ToolSchema } from "@/components/seo/SchemaMarkup";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("qr-barcode", "phone-qr-generator");
  
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
      images: [
        {
          url: "https://ai-productivity-ecosystem-azure.vercel.app/opengraph-image",
          width: 1200,
          height: 630,
          alt: tool.metaTitle || tool.name,
        },
      ],
      type: "website",
      siteName: "AI Productivity Ecosystem",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle || tool.name,
      description: tool.metaDescription || tool.description || "",
    },
  };
}

export default async function Page() {
  const tool = await getToolData("qr-barcode", "phone-qr-generator");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      
      <ToolSchema
        name={tool.name}
        description={tool.metaDescription || tool.description || ""}
        url={`https://ai-productivity-ecosystem-azure.vercel.app/tools/qr-barcode/phone-qr-generator`}
        category="qr-barcode"
        faqs={tool.seoFaqs || undefined}
        steps={tool.seoSteps || undefined}
        rating={tool.seoRating || undefined}
      />
      <PhoneQrGeneratorClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="phone-qr-generator" toolName={tool.name} category="qr-barcode" />
    </>
  );
}