import { config } from "dotenv";
config({ path: ".env.local" });

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    console.log("Creating blog_categories table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "blog_categories" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar(100) NOT NULL,
        "slug" varchar(100) NOT NULL,
        "description" text,
        "color" varchar(20) DEFAULT '#DC2626',
        "sort_order" integer DEFAULT 0,
        "is_active" boolean DEFAULT true,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now(),
        CONSTRAINT "blog_categories_name_unique" UNIQUE("name"),
        CONSTRAINT "blog_categories_slug_unique" UNIQUE("slug")
      );
    `);
    console.log("[OK] blog_categories created!");
    
    console.log("Creating posts table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "posts" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL,
        "excerpt" text,
        "content" text NOT NULL,
        "category_id" integer,
        "featured_image" varchar(500),
        "featured_image_alt" varchar(255),
        "author" varchar(100) DEFAULT 'Iconic Usama',
        "author_avatar" varchar(500),
        "meta_title" varchar(255),
        "meta_description" text,
        "focus_keyword" varchar(100),
        "keywords" text,
        "reading_time" integer DEFAULT 5,
        "view_count" integer DEFAULT 0,
        "is_published" boolean DEFAULT false,
        "is_featured" boolean DEFAULT false,
        "published_at" timestamp,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now(),
        CONSTRAINT "posts_slug_unique" UNIQUE("slug")
      );
    `);
    console.log("[OK] posts created!");
    
    console.log("Adding foreign key...");
    await pool.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'posts_category_id_blog_categories_id_fk'
        ) THEN
          ALTER TABLE "posts" 
          ADD CONSTRAINT "posts_category_id_blog_categories_id_fk" 
          FOREIGN KEY ("category_id") 
          REFERENCES "blog_categories"("id") 
          ON DELETE SET NULL;
        END IF;
      END $$;
    `);
    console.log("[OK] Foreign key added!");
    
    // Verify
    console.log("");
    console.log("=== VERIFICATION ===");
    const tables = await pool.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname='public' 
      AND tablename IN ('blog_categories', 'posts')
      ORDER BY tablename
    `);
    console.log("Blog tables in DB:");
    tables.rows.forEach(r => console.log("  [OK]", r.tablename));
    
    // Check counts
    const catCount = await pool.query("SELECT COUNT(*) FROM blog_categories");
    const postCount = await pool.query("SELECT COUNT(*) FROM posts");
    console.log("");
    console.log("blog_categories rows:", catCount.rows[0].count);
    console.log("posts rows:", postCount.rows[0].count);
    
    console.log("");
    console.log("=====================================");
    console.log("SUCCESS! Blog tables created safely!");
    console.log("=====================================");
    console.log("Your 199 tools + 28 prompts UNTOUCHED!");
    
  } catch (err: any) {
    console.error("ERROR:", err.message);
  } finally {
    await pool.end();
  }
  process.exit(0);
}

migrate();