CREATE TABLE IF NOT EXISTS "pages" (
  "id" serial PRIMARY KEY NOT NULL,
  "slug" text NOT NULL,
  "title" text NOT NULL,
  "content" text,
  "meta_title" text,
  "meta_description" text,
  "is_active" boolean DEFAULT true,
  "show_in_footer" boolean DEFAULT false,
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  CONSTRAINT "pages_slug_unique" UNIQUE("slug")
);