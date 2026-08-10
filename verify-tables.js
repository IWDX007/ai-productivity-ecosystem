require("dotenv").config({ path: ".env.local" });

const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function verifyTables() {
  console.log("");
  console.log("========================================");
  console.log("  NEON DATABASE - TABLE CHECK");
  console.log("========================================");
  console.log("");

  try {
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    if (tables.length === 0) {
      console.log("  Status: NO TABLES FOUND");
      console.log("  Action: Run 'npm run db:push' to create tables");
    } else {
      console.log(`  Status: ${tables.length} TABLES FOUND`);
      console.log("");
      console.log("  Tables:");
      tables.forEach((t, i) => {
        console.log(`    ${i + 1}. ${t.table_name}`);
      });

      const expectedTables = [
        "blogs", "categories", "favorites", "newsletters",
        "prompt_favorites", "prompts", "sessions", "tools",
        "usage_history", "users"
      ];

      const found = tables.map(t => t.table_name);
      const missing = expectedTables.filter(t => !found.includes(t));
      const extra = found.filter(t => !expectedTables.includes(t));

      console.log("");
      if (missing.length === 0 && extra.length === 0) {
        console.log("  ALL 10 EXPECTED TABLES PRESENT!");
      } else {
        if (missing.length > 0) {
          console.log("  Missing tables:", missing.join(", "));
        }
        if (extra.length > 0) {
          console.log("  Extra tables:", extra.join(", "));
        }
      }
    }

    console.log("");
    console.log("========================================");
    console.log("");
  } catch (error) {
    console.log("  ERROR:", error.message);
  }
}

verifyTables();