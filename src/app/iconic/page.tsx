import { db } from "@/lib/db";
import { tools, prompts, categories, posts } from "@/lib/db/schema";
import { count } from "drizzle-orm";
import DashboardClient from "./DashboardClient";

export const revalidate = 0; // Dynamic server component

export default async function AdminDashboardPage() {
  // Fetch DB Counts in parallel
  const [[toolsCount], [promptsCount], [categoriesCount], [postsCount]] =
    await Promise.all([
      db.select({ value: count() }).from(tools),
      db.select({ value: count() }).from(prompts),
      db.select({ value: count() }).from(categories),
      db.select({ value: count() }).from(posts),
    ]);

  const stats = {
    totalTools: toolsCount?.value || 0,
    totalPrompts: promptsCount?.value || 0,
    totalCategories: categoriesCount?.value || 0,
    totalPosts: postsCount?.value || 0,
  };

  return <DashboardClient dbStats={stats} />;
}