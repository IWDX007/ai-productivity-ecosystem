import { db } from "@/lib/db";
import { prompts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PromptForm } from "../../PromptForm";

export const dynamic = "force-dynamic";

export default async function EditPromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const promptId = parseInt(id);

  const [prompt] = await db.select().from(prompts).where(eq(prompts.id, promptId));
  if (!prompt) notFound();

  const list = await db.select({ category: prompts.category }).from(prompts);
  const uniqueCategories = Array.from(new Set(list.map(p => p.category))).sort();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Prompt</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Update prompt information</p>
      </div>

      <PromptForm prompt={prompt} categories={uniqueCategories} />
    </div>
  );
}