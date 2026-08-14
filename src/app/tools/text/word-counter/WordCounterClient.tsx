"use client"

import ToolPageMeta from "@/components/tools/ToolPageMeta"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import TextStatsPanel from "@/components/tools/shared/TextStatsPanel"
import TopWordsPanel from "@/components/tools/shared/TopWordsPanel"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import { analyzeText, getTopWords } from "@/lib/processing/text/wordCounter"

interface WordCounterClientProps {
  name?: string;
  description?: string;
}

interface Props {
  name: string;
  description: string;
}

export default function WordCounterClient({ name = "Word Counter", description = "" }: WordCounterClientProps) {
  return (
    <>
      <Breadcrumbs items={[
        { label: "Tools", href: "/tools" },
        { label: "Text Tools", href: "/tools/text" },
        { label: name }
      ]} />
      <TextToolTemplate
        title={name}
        description={description}
        placeholder="Type or paste your text here to count words, characters, sentences and more..."
        badge="Text Tool"
        statsPanel={(text) => <TextStatsPanel stats={analyzeText(text)} />}
        extraPanel={(text) => <TopWordsPanel words={getTopWords(text, 10)} />}
      />
</>
  )
}