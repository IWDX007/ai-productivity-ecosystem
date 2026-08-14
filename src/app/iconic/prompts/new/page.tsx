import { db } from "@/lib/db";
import { prompts } from "@/lib/db/schema";
import { PromptForm } from "../PromptForm";

export const dynamic = "force-dynamic";

export default async function NewPromptPage() {
  const list = await db.select({ category: prompts.category }).from(prompts);
  const uniqueCategories = Array.from(new Set(list.map(p => p.category))).sort();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Prompt</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new AI prompt for your library</p>
      </div>

      <PromptForm categories={uniqueCategories} />
    </div>
  );
}