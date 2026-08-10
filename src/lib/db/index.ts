/**
 * Database Client - Neon PostgreSQL + Drizzle ORM
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env.local");
}

// Create Neon SQL client
const sql = neon(process.env.DATABASE_URL);

// Create Drizzle instance with full type safety
export const db = drizzle(sql, { schema });

// Re-export schema for convenience
export { schema };
export * from "./schema";