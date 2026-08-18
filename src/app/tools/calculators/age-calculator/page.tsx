import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolData } from "@/lib/data/getToolData";
import AgeCalculatorClient from "./AgeCalculatorClient";
import ToolPageLayout, {
  generateToolMetadata,
} from "@/components/tools/ToolPageLayout";

const CATEGORY_SLUG = "calculators";
const CATEGORY_NAME = "Calculators";
const TOOL_SLUG = "age-calculator";

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
      customSteps={[
        {
          title: "Enter Your Birth Date",
          description: "Select your date of birth using the calendar input above.",
        },
        {
          title: "Choose Target Date",
          description: "Pick today or any future/past date to calculate age against.",
        },
        {
          title: "View Your Exact Age",
          description: "Get your age in years, months, days, hours, and seconds instantly.",
        },
      ]}
    >
      <AgeCalculatorClient
        name={tool.name}
        description={tool.description || ""}
      />
    </ToolPageLayout>
  );
}