"use client"

import RatingSection from "@/components/tools/sections/RatingSection"
import FeaturesSection from "@/components/tools/sections/FeaturesSection"
import HowToSection from "@/components/tools/sections/HowToSection"
import FAQSection from "@/components/tools/sections/FAQSection"
import RelatedToolsSection from "@/components/tools/sections/RelatedToolsSection"
import * as Icons from "lucide-react"

interface Props {
  toolName: string
  category: string
  features: Array<{ icon: string; title: string; description: string }>
  steps: Array<{ title: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  related: Array<{ name: string; href: string; description: string }>
  rating: { score: number; votes: number }
  content?: string
}

export default function SEOSectionsClient({ 
  toolName, 
  category, 
  features, 
  steps, 
  faqs, 
  related, 
  rating,
  content
}: Props) {
  const featuresWithIcons = features.map(f => {
    const IconComp = (Icons as any)[f.icon] || Icons.Sparkles
    return {
      icon: <IconComp className="w-5 h-5" />,
      title: f.title,
      description: f.description,
    }
  })

  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <>
      {rating && <RatingSection rating={rating.score} votes={rating.votes} />}
      {features.length > 0 && (
        <FeaturesSection features={featuresWithIcons} title={`Why Use Our ${toolName}?`} />
      )}
      {steps.length > 0 && (
        <HowToSection steps={steps} title={`How To Use ${toolName}`} />
      )}
      {content && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <article 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-theme-primary 
                prose-p:text-theme-secondary 
                prose-p:leading-relaxed
                prose-li:text-theme-secondary
                prose-strong:text-theme-primary
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                prose-ul:my-4
                prose-li:my-2"
              dangerouslySetInnerHTML={{ __html: content }} 
            />
          </div>
        </section>
      )}
      {faqs.length > 0 && (
        <FAQSection faqs={faqs} title={`${toolName} FAQs`} />
      )}
      {related.length > 0 && (
        <RelatedToolsSection tools={related} title={`Related ${capitalizedCategory} Tools`} />
      )}
    </>
  )
}