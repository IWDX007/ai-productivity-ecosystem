import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./src/lib/db";
import { blogCategories } from "./src/lib/db/schema";

async function seed() {
  const categories = [
    { name: "Tutorials", slug: "tutorials", description: "Step-by-step guides", color: "#3B82F6", sortOrder: 1 },
    { name: "Tips & Tricks", slug: "tips", description: "Quick tips for productivity", color: "#10B981", sortOrder: 2 },
    { name: "Tool Reviews", slug: "reviews", description: "In-depth tool reviews", color: "#F59E0B", sortOrder: 3 },
    { name: "AI Guides", slug: "ai-guides", description: "AI and prompts guides", color: "#8B5CF6", sortOrder: 4 },
    { name: "Announcements", slug: "announcements", description: "News and updates", color: "#DC2626", sortOrder: 5 },
  ];
  
  try {
    for (const cat of categories) {
      await db.insert(blogCategories).values(cat).onConflictDoNothing();
      console.log(`Added: ${cat.name}`);
    }
    console.log("Seed complete!");
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}

seed();