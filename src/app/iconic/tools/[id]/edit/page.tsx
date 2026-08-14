import { db } from "@/lib/db";
import { tools, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ToolForm } from "../../ToolForm";

export const dynamic = "force-dynamic";

export default async function EditToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const toolId = parseInt(id);

  const [tool] = await db.select().from(tools).where(eq(tools.id, toolId));
  if (!tool) notFound();

  const categoriesList = await db.select().from(categories).orderBy(categories.name);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Tool</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Update tool information and SEO</p>
      </div>

      <ToolForm 
        tool={tool}
        categories={categoriesList.map(c => ({ slug: c.slug, name: c.name }))}
      />
    </div>
  );
}