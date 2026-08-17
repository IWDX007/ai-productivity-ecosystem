import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./src/lib/db";
import { blogCategories, posts } from "./src/lib/db/schema";

async function verify() {
  try {
    const cats = await db.select().from(blogCategories);
    const allPosts = await db.select().from(posts);
    
    console.log("Blog Categories:", cats.length);
    console.log("Posts:", allPosts.length);
    console.log("Tables working!");
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}

verify();