import { boolean, integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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
  
  // NEW: SEO Content fields
  seoFeatures: jsonb("seo_features").default([]),
  seoSteps: jsonb("seo_steps").default([]),
  seoFaqs: jsonb("seo_faqs").default([]),
  seoRelated: jsonb("seo_related").default([]),
  seoRating: jsonb("seo_rating").default({}),
  seoContent: text("seo_content"),
  
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


export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true),
  showInFooter: boolean("show_in_footer").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================
// BLOG TABLES
// ============================================================

export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  color: varchar("color", { length: 20 }).default("#DC2626"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  
  // Basic info
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  
  // Category
  categoryId: integer("category_id").references(() => blogCategories.id),
  
  // Media
  featuredImage: varchar("featured_image", { length: 500 }),
  featuredImageAlt: varchar("featured_image_alt", { length: 255 }),
  
  // Author
  author: varchar("author", { length: 100 }).default("Iconic Usama"),
  authorAvatar: varchar("author_avatar", { length: 500 }),
  
  // SEO
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  focusKeyword: varchar("focus_keyword", { length: 100 }),
  keywords: text("keywords"), // comma separated
  
  // Stats
  readingTime: integer("reading_time").default(5), // in minutes
  viewCount: integer("view_count").default(0),
  
  // Status
  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),
  
  // Dates
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});