"use client"

import { useMemo } from "react"
import RatingSection from "@/components/tools/sections/RatingSection"
import FeaturesSection from "@/components/tools/sections/FeaturesSection"
import HowToSection from "@/components/tools/sections/HowToSection"
import FAQSection from "@/components/tools/sections/FAQSection"
import RelatedToolsSection from "@/components/tools/sections/RelatedToolsSection"
import { getToolSEO } from "@/config/tool-seo-content"
import { developerSEOContent } from "@/config/developer-seo-content"
import { converterSEOContent } from "@/config/converter-seo-content"
import { securitySEOContent } from "@/config/security-seo-content"
import { qrBarcodeSEOContent } from "@/config/qr-barcode-seo-content"
import { imageSEOContent } from "@/config/image-seo-content"
import { pdfSEOContent } from "@/config/pdf-seo-content"
import * as Icons from "lucide-react"

interface SEOSectionsProps {
  toolSlug: string
  toolName: string
  category?: string
}

interface NormalizedSEO {
  features: Array<{ icon: string; title: string; description: string }>
  steps: Array<{ title: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  related: Array<{ name: string; href: string; description: string }>
  rating: { score: number; votes: number }
}

function generateRating(slug: string): { score: number; votes: number } {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i)
    hash = hash & hash
  }
  const positiveHash = Math.abs(hash)
  const score = 4.5 + (positiveHash % 5) / 10
  const votes = 3000 + (positiveHash % 12000)
  return { score: parseFloat(score.toFixed(1)), votes: votes }
}

function normalizeCategory(data: any, toolSlug: string): NormalizedSEO {
  return {
    features: data.features,
    steps: data.howToSteps,
    faqs: data.faqs,
    related: data.relatedTools.map((t: any) => ({
      name: t.name, href: t.href, description: t.description
    })),
    rating: generateRating(toolSlug)
  }
}

function getSEOData(toolSlug: string, category: string): NormalizedSEO | null {
  const cat = category.toLowerCase()

  if (cat === "developer" || cat === "developer tools") {
    const s = developerSEOContent[toolSlug]
    if (s) return normalizeCategory(s, toolSlug)
  }

  if (cat === "converter" || cat === "converters") {
    const s = converterSEOContent[toolSlug]
    if (s) return normalizeCategory(s, toolSlug)
  }

  if (cat === "security" || cat === "security tools") {
    const s = securitySEOContent[toolSlug]
    if (s) return normalizeCategory(s, toolSlug)
  }

  if (cat === "qr & barcode" || cat === "qr" || cat === "barcode" || cat === "qr-barcode") {
    const s = qrBarcodeSEOContent[toolSlug]
    if (s) return normalizeCategory(s, toolSlug)
  }

  if (cat === "image" || cat === "image tools") {
    const s = imageSEOContent[toolSlug]
    if (s) return normalizeCategory(s, toolSlug)
  }

  if (cat === "pdf" || cat === "pdf tools") {
    const s = pdfSEOContent[toolSlug]
    if (s) return normalizeCategory(s, toolSlug)
  }

  const textSEO = getToolSEO(toolSlug)
  if (textSEO) {
    return {
      features: textSEO.features,
      steps: textSEO.steps,
      faqs: textSEO.faqs,
      related: textSEO.related,
      rating: textSEO.rating
    }
  }

  const dev = developerSEOContent[toolSlug]
  if (dev) return normalizeCategory(dev, toolSlug)
  const conv = converterSEOContent[toolSlug]
  if (conv) return normalizeCategory(conv, toolSlug)
  const sec = securitySEOContent[toolSlug]
  if (sec) return normalizeCategory(sec, toolSlug)
  const qr = qrBarcodeSEOContent[toolSlug]
  if (qr) return normalizeCategory(qr, toolSlug)
  const img = imageSEOContent[toolSlug]
  if (img) return normalizeCategory(img, toolSlug)
  const pdf = pdfSEOContent[toolSlug]
  if (pdf) return normalizeCategory(pdf, toolSlug)

  return null
}

export default function SEOSections({ toolSlug, toolName, category = "Text" }: SEOSectionsProps) {
  const seo = useMemo(() => getSEOData(toolSlug, category), [toolSlug, category])

  if (!seo) return null

  const featuresWithIcons = seo.features.map(f => {
    const IconComp = (Icons as any)[f.icon] || Icons.Sparkles
    return {
      icon: <IconComp className="w-5 h-5" />,
      title: f.title,
      description: f.description,
    }
  })

  return (
    <>
      <RatingSection rating={seo.rating.score} votes={seo.rating.votes} />
      <FeaturesSection features={featuresWithIcons} title={`Why Use Our ${toolName}?`} />
      <HowToSection steps={seo.steps} title={`How To Use ${toolName}`} />
      <FAQSection faqs={seo.faqs} title={`${toolName} FAQs`} />
      <RelatedToolsSection tools={seo.related} title={`Related ${category} Tools`} />
    </>
  )
}