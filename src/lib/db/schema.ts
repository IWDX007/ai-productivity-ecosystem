import { pgTable, text, integer, boolean, timestamp, jsonb, serial } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  toolCount: integer("tool_count").default(0),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  categorySlug: text("category_slug").notNull(),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  seoScore: integer("seo_score").default(0),
  tags: jsonb("tags").default([]),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const prompts = pgTable("prompts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").default([]),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const seoData = pgTable("seo_data", {
  id: serial("id").primaryKey(),
  pageSlug: text("page_slug").notNull().unique(),
  pageType: text("page_type").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  seoScore: integer("seo_score").default(0),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  schemaType: text("schema_type"),
  schemaData: jsonb("schema_data"),
  canonicalUrl: text("canonical_url"),
  noIndex: boolean("no_index").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  type: text("type").default("text"),
  updatedAt: timestamp("updated_at").defaultNow(),
});