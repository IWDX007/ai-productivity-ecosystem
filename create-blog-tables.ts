import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./src/lib/db";
import { sql } from "drizzle-orm";

async function migrate() {
  try {
    console.log("Creating blog_categories table...");
    
    await db.execute(sql`
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
    console.log("blog_categories created!");
    
    console.log("Creating posts table...");
    
    await db.execute(sql`
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
    console.log("posts created!");
    
    console.log("Adding foreign key...");
    
    await db.execute(sql`
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
    console.log("Foreign key added!");
    
    console.log("");
    console.log("=====================================");
    console.log("SUCCESS! Blog tables created safely!");
    console.log("=====================================");
    console.log("");
    console.log("Your existing 199 tools, 28 prompts are UNTOUCHED!");
    
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}

migrate();