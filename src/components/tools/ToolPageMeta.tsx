"use client"

import { useEffect } from "react"

interface ToolPageMetaProps {
  title: string
  description?: string
  keywords?: string
}

export default function ToolPageMeta({ 
  title, 
  description, 
  keywords 
}: ToolPageMetaProps) {
  useEffect(() => {
    const fullTitle = `${title} - Free Online Tool | AI Productivity Ecosystem`
    document.title = fullTitle

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords)
    }

    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', fullTitle)

    if (description) {
      let ogDesc = document.querySelector('meta[property="og:description"]')
      if (!ogDesc) {
        ogDesc = document.createElement('meta')
        ogDesc.setAttribute('property', 'og:description')
        document.head.appendChild(ogDesc)
      }
      ogDesc.setAttribute('content', description)
    }

    let twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta')
      twitterTitle.setAttribute('name', 'twitter:title')
      document.head.appendChild(twitterTitle)
    }
    twitterTitle.setAttribute('content', fullTitle)

    if (description) {
      let twitterDesc = document.querySelector('meta[name="twitter:description"]')
      if (!twitterDesc) {
        twitterDesc = document.createElement('meta')
        twitterDesc.setAttribute('name', 'twitter:description')
        document.head.appendChild(twitterDesc)
      }
      twitterDesc.setAttribute('content', description)
    }
  }, [title, description, keywords])

  return null
}