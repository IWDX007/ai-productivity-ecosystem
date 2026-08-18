import { ReactNode } from "react";
import SEOSections from "@/components/tools/SEOSections";
import { ToolSchema } from "@/components/seo/SchemaMarkup";
import HowToUseSteps from "@/components/tools/enhanced/HowToUseSteps";
import FeatureCards from "@/components/tools/enhanced/FeatureCards";
import RelatedToolsGrid from "@/components/tools/enhanced/RelatedToolsGrid";
import ExploreCategories from "@/components/tools/enhanced/ExploreCategories";
import SecurityTrustBox from "@/components/tools/enhanced/SecurityTrustBox";
import {
  getRelatedToolsByCategory,
  getAllCategoriesWithCount,
} from "@/lib/data/getToolData";

interface ToolPageLayoutProps {
  tool: any;
  categorySlug: string;
  categoryName: string;
  toolSlug: string;
  children: ReactNode; // The tool's client component
  customSteps?: {
    title: string;
    description: string;
  }[];
  siteUrl?: string;
}

export default async function ToolPageLayout({
  tool,
  categorySlug,
  categoryName,
  toolSlug,
  children,
  customSteps,
  siteUrl = "https://ai-productivity-ecosystem-azure.vercel.app",
}: ToolPageLayoutProps) {
  // Fetch related tools + categories in parallel
  const [relatedTools, allCategories] = await Promise.all([
    getRelatedToolsByCategory(categorySlug, toolSlug, 6),
    getAllCategoriesWithCount(),
  ]);

  return (
    <>
      {/* Schema Markup */}
      <ToolSchema
        name={tool.name}
        description={tool.metaDescription || tool.description || ""}
        url={`${siteUrl}/tools/${categorySlug}/${toolSlug}`}
        category={categorySlug}
        faqs={tool.seoFaqs || undefined}
        steps={tool.seoSteps || undefined}
        rating={tool.seoRating || undefined}
      />

      {/* Tool Interface (passed as children) */}
      {children}

      {/* Enhanced Sections Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 1. How to Use */}
        <HowToUseSteps toolName={tool.name} steps={customSteps} />

        {/* 2. Feature Cards */}
        <FeatureCards />

        {/* 3. Existing SEO Content */}
        <SEOSections
          toolSlug={toolSlug}
          toolName={tool.name}
          category={categorySlug}
        />

        {/* 4. Related Tools from Same Category */}
        <RelatedToolsGrid
          currentToolSlug={toolSlug}
          categorySlug={categorySlug}
          categoryName={categoryName}
          relatedTools={relatedTools}
        />

        {/* 5. Explore Other Categories */}
        <ExploreCategories
          categories={allCategories}
          currentCategorySlug={categorySlug}
        />

        {/* 6. Security Trust Box */}
        <SecurityTrustBox />
      </div>
    </>
  );
}

// Helper function to generate metadata (use in each page)
export function generateToolMetadata(
  tool: any,
  siteUrl: string = "https://ai-productivity-ecosystem-azure.vercel.app"
) {
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
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: tool.metaTitle || tool.name,
        },
      ],
      type: "website" as const,
      siteName: "AI Productivity Ecosystem",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: tool.metaTitle || tool.name,
      description: tool.metaDescription || tool.description || "",
    },
  };
}