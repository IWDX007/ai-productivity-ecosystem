import { db } from "@/lib/db";
import { tools } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { SEOEditor } from "./SEOEditor";

export const dynamic = "force-dynamic";

export default async function SEOEditPage({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await params;
  const itemId = parseInt(id);

  if (type !== "tool") notFound();

  const [tool] = await db.select().from(tools).where(eq(tools.id, itemId));
  if (!tool) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          SEO Editor: {tool.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Optimize this page for search engines
        </p>
      </div>

      <SEOEditor tool={tool} />
    </div>
  );
}