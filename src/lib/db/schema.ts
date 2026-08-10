/**
 * Database Schema - AI Productivity Ecosystem
 * 10 Tables for Phase 1
 */

import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb,
  uuid,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================
// 1. USERS TABLE
// ============================================================
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: varchar("clerk_id", { length: 255 }).unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }),
    avatar: text("avatar"),
    plan: varchar("plan", { length: 50 }).default("free").notNull(), // free | pro
    role: varchar("role", { length: 50 }).default("user").notNull(), // user | admin
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    clerkIdIdx: index("users_clerk_id_idx").on(table.clerkId),
    emailIdx: index("users_email_idx").on(table.email),
  })
);

// ============================================================
// 2. CATEGORIES TABLE
// ============================================================
export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    description: text("description"),
    icon: varchar("icon", { length: 100 }), // Lucide icon name
    color: varchar("color", { length: 20 }), // Hex color
    toolCount: integer("tool_count").default(0).notNull(),
    order: integer("order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("categories_slug_idx").on(table.slug),
  })
);

// ============================================================
// 3. TOOLS TABLE
// ============================================================
export const tools = pgTable(
  "tools",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    description: text("description"),
    shortDescription: varchar("short_description", { length: 500 }),
    category: varchar("category", { length: 100 }).notNull(),
    subcategory: varchar("subcategory", { length: 100 }),
    templateType: varchar("template_type", { length: 100 }).notNull(),
    icon: varchar("icon", { length: 100 }),
    iconColor: varchar("icon_color", { length: 20 }),
    badge: varchar("badge", { length: 50 }), // new | popular | updated
    keywords: jsonb("keywords").$type<string[]>().default([]),
    isActive: boolean("is_active").default(true).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isNew: boolean("is_new").default(false).notNull(),
    isPopular: boolean("is_popular").default(false).notNull(),
    usageCount: integer("usage_count").default(0).notNull(),
    rating: integer("rating").default(0).notNull(), // 0-500 (multiply by 100 for decimals)
    ratingCount: integer("rating_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("tools_slug_idx").on(table.slug),
    categoryIdx: index("tools_category_idx").on(table.category),
    activeIdx: index("tools_active_idx").on(table.isActive),
    featuredIdx: index("tools_featured_idx").on(table.isFeatured),
  })
);

// ============================================================
// 4. BLOGS TABLE
// ============================================================
export const blogs = pgTable(
  "blogs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 500 }).notNull(),
    slug: varchar("slug", { length: 500 }).unique().notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    category: varchar("category", { length: 100 }),
    tags: jsonb("tags").$type<string[]>().default([]),
    authorId: uuid("author_id").references(() => users.id, {
      onDelete: "set null",
    }),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: varchar("seo_description", { length: 500 }),
    ogImage: text("og_image"),
    coverImage: text("cover_image"),
    source: varchar("source", { length: 20 }).default("db").notNull(), // db | mdx
    readTime: integer("read_time").default(5).notNull(), // minutes
    viewCount: integer("view_count").default(0).notNull(),
    isPublished: boolean("is_published").default(false).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: index("blogs_slug_idx").on(table.slug),
    categoryIdx: index("blogs_category_idx").on(table.category),
    publishedIdx: index("blogs_published_idx").on(table.isPublished),
    featuredIdx: index("blogs_featured_idx").on(table.isFeatured),
  })
);

// ============================================================
// 5. PROMPTS TABLE
// ============================================================
export const prompts = pgTable(
  "prompts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    number: integer("number").notNull(), // #001, #002, etc.
    title: varchar("title", { length: 500 }).notNull(),
    content: text("content").notNull(), // The actual prompt text
    category: varchar("category", { length: 100 }).notNull(),
    platform: varchar("platform", { length: 100 }), // Midjourney, DALL-E, etc.
    imageUrl: text("image_url"),
    tags: jsonb("tags").$type<string[]>().default([]),
    viewCount: integer("view_count").default(0).notNull(),
    copyCount: integer("copy_count").default(0).notNull(),
    likeCount: integer("like_count").default(0).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isTrending: boolean("is_trending").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    numberIdx: uniqueIndex("prompts_number_idx").on(table.number),
    categoryIdx: index("prompts_category_idx").on(table.category),
    trendingIdx: index("prompts_trending_idx").on(table.isTrending),
  })
);

// ============================================================
// 6. FAVORITES TABLE (Junction: Users ↔ Tools)
// ============================================================
export const favorites = pgTable(
  "favorites",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    toolId: uuid("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.toolId] }),
    userIdx: index("favorites_user_idx").on(table.userId),
    toolIdx: index("favorites_tool_idx").on(table.toolId),
  })
);

// ============================================================
// 7. PROMPT FAVORITES TABLE (Junction: Users ↔ Prompts)
// ============================================================
export const promptFavorites = pgTable(
  "prompt_favorites",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    promptId: uuid("prompt_id")
      .notNull()
      .references(() => prompts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.promptId] }),
    userIdx: index("prompt_favorites_user_idx").on(table.userId),
    promptIdx: index("prompt_favorites_prompt_idx").on(table.promptId),
  })
);

// ============================================================
// 8. USAGE HISTORY TABLE
// ============================================================
export const usageHistory = pgTable(
  "usage_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    toolId: uuid("tool_id").references(() => tools.id, {
      onDelete: "cascade",
    }),
    sessionId: varchar("session_id", { length: 255 }), // For guest tracking
    action: varchar("action", { length: 50 }).notNull(), // view | use | copy | download
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("usage_history_user_idx").on(table.userId),
    toolIdx: index("usage_history_tool_idx").on(table.toolId),
    sessionIdx: index("usage_history_session_idx").on(table.sessionId),
    createdAtIdx: index("usage_history_created_at_idx").on(table.createdAt),
  })
);

// ============================================================
// 9. SESSIONS TABLE (Optional - Clerk handles this mostly)
// ============================================================
export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionToken: varchar("session_token", { length: 255 }).unique().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    tokenIdx: index("sessions_token_idx").on(table.sessionToken),
    userIdx: index("sessions_user_idx").on(table.userId),
  })
);

// ============================================================
// 10. NEWSLETTERS TABLE
// ============================================================
export const newsletters = pgTable(
  "newsletters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }),
    isConfirmed: boolean("is_confirmed").default(false).notNull(),
    confirmationToken: varchar("confirmation_token", { length: 255 }),
    confirmedAt: timestamp("confirmed_at"),
    unsubscribedAt: timestamp("unsubscribed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("newsletters_email_idx").on(table.email),
    confirmedIdx: index("newsletters_confirmed_idx").on(table.isConfirmed),
  })
);

// ============================================================
// RELATIONS
// ============================================================
export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  promptFavorites: many(promptFavorites),
  usageHistory: many(usageHistory),
  sessions: many(sessions),
  blogs: many(blogs),
}));

export const toolsRelations = relations(tools, ({ many }) => ({
  favorites: many(favorites),
  usageHistory: many(usageHistory),
}));

export const promptsRelations = relations(prompts, ({ many }) => ({
  favorites: many(promptFavorites),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  author: one(users, {
    fields: [blogs.authorId],
    references: [users.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  tool: one(tools, {
    fields: [favorites.toolId],
    references: [tools.id],
  }),
}));

export const promptFavoritesRelations = relations(promptFavorites, ({ one }) => ({
  user: one(users, {
    fields: [promptFavorites.userId],
    references: [users.id],
  }),
  prompt: one(prompts, {
    fields: [promptFavorites.promptId],
    references: [prompts.id],
  }),
}));

// ============================================================
// TYPE EXPORTS
// ============================================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Tool = typeof tools.$inferSelect;
export type NewTool = typeof tools.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type Prompt = typeof prompts.$inferSelect;
export type NewPrompt = typeof prompts.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type PromptFavorite = typeof promptFavorites.$inferSelect;
export type UsageHistory = typeof usageHistory.$inferSelect;
export type NewUsageHistory = typeof usageHistory.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Newsletter = typeof newsletters.$inferSelect;
export type NewNewsletter = typeof newsletters.$inferInsert;