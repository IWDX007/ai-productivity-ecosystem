import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import CurrencyCalculatorClient from "./CurrencyCalculatorClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("calculators", "currency-calculator");
  
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
  const tool = await getToolData("calculators", "currency-calculator");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <CurrencyCalculatorClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="currency-calculator" toolName={tool.name} category="calculators" />
    </>
  );
}