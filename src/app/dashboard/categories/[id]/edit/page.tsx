import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CategoryForm } from "../../CategoryForm";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const catId = parseInt(id);

  const [category] = await db.select().from(categories).where(eq(categories.id, catId));
  if (!category) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Category</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Update category information</p>
      </div>

      <CategoryForm category={category} />
    </div>
  );
}