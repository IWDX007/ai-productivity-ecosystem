import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { ToolForm } from "../ToolForm";

export const dynamic = "force-dynamic";

export default async function NewToolPage() {
  const categoriesList = await db.select().from(categories).orderBy(categories.name);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Tool</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new tool for your site</p>
      </div>

      <ToolForm 
        categories={categoriesList.map(c => ({ slug: c.slug, name: c.name }))}
      />
    </div>
  );
}