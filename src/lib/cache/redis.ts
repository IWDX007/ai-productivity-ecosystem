/**
 * Redis Cache Client - Upstash
 * Cache helpers for common operations
 */

import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error("Upstash Redis env vars not configured");
}

// Create Redis client
export const redis = Redis.fromEnv();

// ============================================================
// CACHE DURATIONS (in seconds)
// ============================================================
export const CACHE_TTL = {
  SHORT: 60 * 5, // 5 minutes
  MEDIUM: 60 * 30, // 30 minutes
  LONG: 60 * 60, // 1 hour
  VERY_LONG: 60 * 60 * 24, // 24 hours
} as const;

// ============================================================
// CACHE HELPERS
// ============================================================

/**
 * Get value from cache
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const value = await redis.get<T>(key);
    return value;
  } catch (error) {
    console.error(`Cache GET error for key ${key}:`, error);
    return null;
  }
}

/**
 * Set value in cache with TTL
 */
export async function setCache<T>(
  key: string,
  value: T,
  ttl: number = CACHE_TTL.MEDIUM
): Promise<boolean> {
  try {
    await redis.set(key, value, { ex: ttl });
    return true;
  } catch (error) {
    console.error(`Cache SET error for key ${key}:`, error);
    return false;
  }
}

/**
 * Delete value from cache
 */
export async function deleteCache(key: string): Promise<boolean> {
  try {
    await redis.del(key);
    return true;
  } catch (error) {
    console.error(`Cache DELETE error for key ${key}:`, error);
    return false;
  }
}

/**
 * Delete all keys matching a pattern
 */
export async function deleteCachePattern(pattern: string): Promise<number> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length === 0) return 0;
    return await redis.del(...keys);
  } catch (error) {
    console.error(`Cache DELETE pattern error for ${pattern}:`, error);
    return 0;
  }
}

/**
 * Cache wrapper - get from cache or fetch and cache
 */
export async function cacheOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = CACHE_TTL.MEDIUM
): Promise<T> {
  // Try cache first
  const cached = await getCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  const fresh = await fetcher();

  // Cache it (fire and forget)
  setCache(key, fresh, ttl).catch(console.error);

  return fresh;
}

/**
 * Increment counter (for view counts, etc.)
 */
export async function incrementCounter(key: string): Promise<number> {
  try {
    return await redis.incr(key);
  } catch (error) {
    console.error(`Cache INCR error for key ${key}:`, error);
    return 0;
  }
}

// ============================================================
// CACHE KEY GENERATORS
// ============================================================
export const cacheKeys = {
  tool: (slug: string) => `tool:${slug}`,
  tools: (category?: string) => (category ? `tools:${category}` : "tools:all"),
  popularTools: () => "tools:popular",
  featuredTools: () => "tools:featured",

  blog: (slug: string) => `blog:${slug}`,
  blogs: (category?: string) => (category ? `blogs:${category}` : "blogs:all"),
  latestBlogs: () => "blogs:latest",

  prompt: (id: string) => `prompt:${id}`,
  prompts: (category?: string) =>
    category ? `prompts:${category}` : "prompts:all",
  trendingPrompts: () => "prompts:trending",

  userFavorites: (userId: string) => `favorites:${userId}`,
  categories: () => "categories:all",
  stats: () => "stats:global",
} as const;