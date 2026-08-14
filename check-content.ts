import "dotenv/config";
import { db } from "./src/lib/db";
import { tools } from "./src/lib/db/schema";

async function check() {
  const allTools = await db.select().from(tools);
  
  console.log("\n=======================================");
  console.log("  CONTENT AUDIT REPORT");
  console.log("=======================================\n");
  
  const stats: any = {};
  const missingContent: any[] = [];
  
  for (const tool of allTools) {
    const cat = tool.categorySlug;
    if (!stats[cat]) {
      stats[cat] = { total: 0, features: 0, steps: 0, faqs: 0, related: 0, content: 0 };
    }
    
    stats[cat].total++;
    
    const features = (tool.seoFeatures as any[]) || [];
    const steps = (tool.seoSteps as any[]) || [];
    const faqs = (tool.seoFaqs as any[]) || [];
    const related = (tool.seoRelated as any[]) || [];
    const content = tool.seoContent || "";
    
    if (features.length > 0) stats[cat].features++;
    if (steps.length > 0) stats[cat].steps++;
    if (faqs.length > 0) stats[cat].faqs++;
    if (related.length > 0) stats[cat].related++;
    if (content.length > 100) stats[cat].content++;
    
    if (!content || content.length < 100) {
      missingContent.push({
        category: cat,
        name: tool.name,
        slug: tool.slug
      });
    }
  }
  
  console.log("CATEGORY-WISE COVERAGE:");
  console.log("");
  console.log("Category         Total  Feat  Steps  FAQs  Related  Content");
  console.log("----------------------------------------------------------------");
  
  for (const cat in stats) {
    const s = stats[cat];
    const line = 
      cat.padEnd(17) + 
      String(s.total).padStart(5) + "  " +
      String(s.features).padStart(4) + "  " +
      String(s.steps).padStart(5) + "  " +
      String(s.faqs).padStart(4) + "  " +
      String(s.related).padStart(7) + "  " +
      String(s.content).padStart(7);
    console.log(line);
  }
  
  console.log("\n=======================================");
  console.log("TOOLS WITH MISSING CONTENT (BODY TEXT):");
  console.log("=======================================\n");
  
  const byCategory: any = {};
  missingContent.forEach(t => {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  });
  
  for (const cat in byCategory) {
    console.log(`\n${cat.toUpperCase()} (${byCategory[cat].length} tools):`);
    byCategory[cat].forEach((t: any) => {
      console.log(`  - ${t.name} (/${t.slug})`);
    });
  }
  
  console.log("\n=======================================");
  console.log("SUMMARY:");
  console.log("=======================================");
  const totalTools = allTools.length;
  const withContent = allTools.filter(t => t.seoContent && t.seoContent.length > 100).length;
  const withoutContent = totalTools - withContent;
  
  console.log(`Total Tools:          ${totalTools}`);
  console.log(`With Body Content:    ${withContent}`);
  console.log(`Missing Body Content: ${withoutContent}`);
  console.log(`Coverage:             ${((withContent/totalTools)*100).toFixed(1)}%`);
  console.log("=======================================\n");
  
  process.exit(0);
}

check().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});