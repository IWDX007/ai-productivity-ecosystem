import { db } from "@/lib/db";
import { prompts } from "@/lib/db/schema";
import { PromptsTable } from "./PromptsTable";

export const dynamic = "force-dynamic";

export default async function PromptsPage() {
  const promptsList = await db.select().from(prompts).orderBy(prompts.title);
  const uniqueCategories = Array.from(new Set(promptsList.map(p => p.category))).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prompts Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage all {promptsList.length} AI prompts on your site
        </p>
      </div>

      <PromptsTable initialPrompts={promptsList} categories={uniqueCategories} />
    </div>
  );
}