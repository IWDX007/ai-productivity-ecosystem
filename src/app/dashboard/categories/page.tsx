import { db } from "@/lib/db";
import { categories, tools } from "@/lib/db/schema";
import { CategoriesTable } from "./CategoriesTable";
import { count } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categoriesList = await db.select().from(categories).orderBy(categories.sortOrder, categories.name);

  const toolCountsRaw = await db
    .select({ category: tools.categorySlug, count: count() })
    .from(tools)
    .groupBy(tools.categorySlug);

  const toolCounts: Record<string, number> = {};
  toolCountsRaw.forEach(t => { toolCounts[t.category] = t.count; });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage {categoriesList.length} categories organizing your tools
        </p>
      </div>

      <CategoriesTable initialCategories={categoriesList} toolCounts={toolCounts} />
    </div>
  );
}