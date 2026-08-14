import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import InvestmentCalculatorClient from "./InvestmentCalculatorClient";
import SEOSections from "@/components/tools/SEOSections";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData("calculators", "investment-calculator");
  
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
  const tool = await getToolData("calculators", "investment-calculator");
  
  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <>
      <InvestmentCalculatorClient 
      name={tool.name}
      description={tool.description || ""}
    />
      <SEOSections toolSlug="investment-calculator" toolName={tool.name} category="calculators" />
    </>
  );
}