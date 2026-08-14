import { db } from "@/lib/db";
import { tools, categories } from "@/lib/db/schema";
import { ToolsTable } from "./ToolsTable";

export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const [toolsList, categoriesList] = await Promise.all([
    db.select().from(tools).orderBy(tools.name),
    db.select().from(categories).orderBy(categories.name),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tools Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all {toolsList.length} tools on your site
          </p>
        </div>
      </div>

      <ToolsTable 
        initialTools={toolsList}
        categories={categoriesList.map(c => ({ slug: c.slug, name: c.name }))}
      />
    </div>
  );
}