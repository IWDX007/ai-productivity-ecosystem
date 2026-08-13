import "dotenv/config";
import { db } from "./index";
import { categories as categoriesTable, tools as toolsTable, prompts as promptsTable } from "./schema";
import { categories } from "../../config/tools-data";
import { allPrompts, promptCategories } from "../../config/prompts-data";

async function migrate() {
  console.log("🚀 Starting migration...\n");

  // 1. Migrate Tool Categories
  console.log("📁 Migrating tool categories...");
  const categoryList = Object.values(categories);
  for (const cat of categoryList) {
    await db.insert(categoriesTable).values({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      icon: cat.icon || "",
      color: cat.color || "",
      toolCount: cat.liveTools || 0,
      isActive: cat.status === "live",
      sortOrder: 0,
    }).onConflictDoNothing();
  }
  console.log(`✅ ${categoryList.length} tool categories migrated\n`);

  // 2. Migrate Tools (from nested structure)
  console.log("🛠️  Migrating tools...");
  let toolCount = 0;
  for (const cat of categoryList) {
    for (const tool of cat.tools) {
      await db.insert(toolsTable).values({
        name: tool.name,
        slug: tool.slug,
        description: tool.description || "",
        categorySlug: cat.slug,
        isActive: tool.status === "live",
        isFeatured: tool.isPopular || false,
        metaTitle: `${tool.name} - Free Online Tool`,
        metaDescription: tool.description || "",
        focusKeyword: tool.name.toLowerCase(),
        seoScore: 0,
        tags: [],
        sortOrder: 0,
      }).onConflictDoNothing();
      toolCount++;
    }
  }
  console.log(`✅ ${toolCount} tools migrated\n`);

  // 3. Migrate Prompts
  console.log("💡 Migrating prompts...");
  for (const prompt of allPrompts) {
    await db.insert(promptsTable).values({
      title: prompt.title,
      slug: prompt.slug,
      description: prompt.description || "",
      content: prompt.prompt || "",
      category: prompt.category,
      tags: prompt.tags || [],
      isActive: true,
      isFeatured: prompt.isFeatured || false,
      usageCount: prompt.views || 0,
    }).onConflictDoNothing();
  }
  console.log(`✅ ${allPrompts.length} prompts migrated\n`);

  console.log("═══════════════════════════════════");
  console.log("🎉 MIGRATION COMPLETE!");
  console.log("═══════════════════════════════════");
  console.log(`📁 Categories: ${categoryList.length}`);
  console.log(`🛠️  Tools:      ${toolCount}`);
  console.log(`💡 Prompts:    ${allPrompts.length}`);
  console.log("═══════════════════════════════════\n");
  
  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});