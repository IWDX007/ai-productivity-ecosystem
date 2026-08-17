import { config } from "dotenv";
config({ path: ".env.local" });

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  const categories = [
    { name: "Tutorials", slug: "tutorials", description: "Step-by-step guides", color: "#3B82F6", sort_order: 1 },
    { name: "Tips & Tricks", slug: "tips", description: "Quick tips for productivity", color: "#10B981", sort_order: 2 },
    { name: "Tool Reviews", slug: "reviews", description: "In-depth tool reviews", color: "#F59E0B", sort_order: 3 },
    { name: "AI Guides", slug: "ai-guides", description: "AI and prompts guides", color: "#8B5CF6", sort_order: 4 },
    { name: "Announcements", slug: "announcements", description: "News and updates", color: "#DC2626", sort_order: 5 },
  ];
  
  try {
    for (const cat of categories) {
      await pool.query(
        `INSERT INTO blog_categories (name, slug, description, color, sort_order) 
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO NOTHING`,
        [cat.name, cat.slug, cat.description, cat.color, cat.sort_order]
      );
      console.log("[OK] Added:", cat.name);
    }
    
    const count = await pool.query("SELECT COUNT(*) FROM blog_categories");
    console.log("");
    console.log("Total categories:", count.rows[0].count);
    console.log("Seed complete!");
    
  } catch (err: any) {
    console.error("ERROR:", err.message);
  } finally {
    await pool.end();
  }
  process.exit(0);
}

seed();