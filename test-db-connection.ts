import { config } from "dotenv";
config({ path: ".env.local" });

console.log("");
console.log("=== ENV CHECK ===");
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("URL length:", process.env.DATABASE_URL?.length || 0);
console.log("URL starts with:", process.env.DATABASE_URL?.substring(0, 30) + "...");
console.log("");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not loaded!");
  process.exit(1);
}

// Try direct pg connection
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    console.log("Testing connection...");
    const result = await pool.query("SELECT NOW() as time, current_database() as db");
    console.log("SUCCESS!");
    console.log("Time:", result.rows[0].time);
    console.log("DB:", result.rows[0].db);
    
    // List tables
    const tables = await pool.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname='public' 
      ORDER BY tablename
    `);
    console.log("");
    console.log("Existing tables:");
    tables.rows.forEach(r => console.log("  -", r.tablename));
    
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
  process.exit(0);
}

test();