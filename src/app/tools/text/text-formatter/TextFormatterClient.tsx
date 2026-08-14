"use client"
import ToolPageMeta from "@/components/tools/ToolPageMeta"
import { formatText } from "@/lib/processing/text/allTextProcessors"
import TextToolTemplate from "@/components/tools/templates/TextToolTemplate"
import Breadcrumbs from "@/components/layout/Breadcrumbs"
interface Props { name: string; description: string; }
export default function TextFormatterClient({ name, description }: Props) {
  return (
    <>
      <ToolPageMeta title="Text Formatter" description="Clean and format text by removing extra whitespace, normalizing line breaks and trimming lines." keywords="text formatter, free online tool, text-formatter, text tools, ai productivity" />
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools", href: "/tools/text" }, { label: "Text Formatter" }]} />
      <TextToolTemplate
        title="Text Formatter"
        description="Clean and format text by removing extra whitespace, normalizing line breaks and trimming lines."
        placeholder="Paste messy text to format..."
        badge="Text Tool"
        showOutput={true}
        onProcess={formatText}
      />
</>
  )
}