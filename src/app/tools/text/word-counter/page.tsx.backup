"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import TextStatsPanel from "@/components/tools/shared/TextStatsPanel"
import TopWordsPanel from "@/components/tools/shared/TopWordsPanel"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import SEOSections from "@/components/tools/SEOSections"
import { analyzeText, getTopWords } from "@/lib/processing/text/wordCounter"

export default function Page() {
  return (
    <>
      <ToolPageMeta title="Word Counter" description="Count words, characters, sentences, paragraphs and get detailed text statistics instantly. Free online tool with no login required." keywords="word counter, free online tool, word-counter, text tools, ai productivity" />
      <Breadcrumbs items={[
        { label: "Tools", href: "/tools" },
        { label: "Text Tools", href: "/tools/text" },
        { label: "Word Counter" }
      ]} />
      <TextToolTemplate
        title="Word Counter"
        description="Count words, characters, sentences, paragraphs and get detailed text statistics instantly. Free online tool with no login required."
        placeholder="Type or paste your text here to count words, characters, sentences and more..."
        badge="Text Tool"
        statsPanel={(text) => <TextStatsPanel stats={analyzeText(text)} />}
        extraPanel={(text) => <TopWordsPanel words={getTopWords(text, 10)} />}
      />
      <SEOSections toolSlug="word-counter" toolName="Word Counter" />
    </>
  )
}