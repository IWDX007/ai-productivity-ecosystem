import { getToolData } from "@/lib/data/getToolData"
import SEOSectionsClient from "./SEOSectionsClient"

interface SEOSectionsProps {
  toolSlug: string
  toolName: string
  category?: string
}

export default async function SEOSections({ toolSlug, toolName, category }: SEOSectionsProps) {
  if (!category) return null
  
  const tool = await getToolData(category, toolSlug)
  if (!tool) return null
  
  const features = (tool.seoFeatures as any[]) || []
  const steps = (tool.seoSteps as any[]) || []
  const faqs = (tool.seoFaqs as any[]) || []
  const related = (tool.seoRelated as any[]) || []
  const rating = (tool.seoRating as any) || { score: 4.8, votes: 5000 }
  const content = tool.seoContent || ""
  
  if (features.length === 0 && steps.length === 0 && faqs.length === 0 && !content) {
    return null
  }
  
  return (
    <SEOSectionsClient
      toolName={toolName}
      category={category}
      features={features}
      steps={steps}
      faqs={faqs}
      related={related}
      rating={rating}
      content={content}
    />
  )
}