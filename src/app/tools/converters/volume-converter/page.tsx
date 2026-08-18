import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import VolumeConverterClient from "./VolumeConverterClient";
import ToolPageLayout, {
  generateToolMetadata,
} from "@/components/tools/ToolPageLayout";

const CATEGORY_SLUG = "converters";
const CATEGORY_NAME = "Converters";
const TOOL_SLUG = "volume-converter";

export async function generateMetadata(): Promise<Metadata> {
  const tool = await getToolData(CATEGORY_SLUG, TOOL_SLUG);
  return generateToolMetadata(tool);
}

export default async function Page() {
  const tool = await getToolData(CATEGORY_SLUG, TOOL_SLUG);

  if (!tool || !tool.isActive) {
    notFound();
  }

  return (
    <ToolPageLayout
      tool={tool}
      categorySlug={CATEGORY_SLUG}
      categoryName={CATEGORY_NAME}
      toolSlug={TOOL_SLUG}
    >
      <VolumeConverterClient
        name={tool.name}
        description={tool.description || ""}
      />
    </ToolPageLayout>
  );
}