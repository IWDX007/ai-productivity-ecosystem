import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import Ean13BarcodeGeneratorClient from "./Ean13BarcodeGeneratorClient";
import ToolPageLayout, {
  generateToolMetadata,
} from "@/components/tools/ToolPageLayout";

const CATEGORY_SLUG = "qr-barcode";
const CATEGORY_NAME = "QR & Barcode";
const TOOL_SLUG = "ean13-barcode-generator";

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
      <Ean13BarcodeGeneratorClient
        name={tool.name}
        description={tool.description || ""}
      />
    </ToolPageLayout>
  );
}