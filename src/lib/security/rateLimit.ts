/**
 * Rate Limiting - Upstash Ratelimit
 * Different limits for different user types
 */

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/cache/redis";

// ============================================================
// RATE LIMITERS
// ============================================================

/**
 * Guest user rate limit: 30 requests per minute
 */
export const guestRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
  prefix: "ratelimit:guest",
});

/**
 * Free user rate limit: 100 requests per minute
 */
export const freeRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  analytics: true,
  prefix: "ratelimit:free",
});

/**
 * Pro user rate limit: 500 requests per minute
 */
export const proRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(500, "1 m"),
  analytics: true,
  prefix: "ratelimit:pro",
});

/**
 * Strict rate limit for sensitive endpoints
 * (login attempts, password reset, etc.)
 */
export const strictRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "ratelimit:strict",
});

// ============================================================
// HELPER FUNCTION
// ============================================================

/**
 * Get appropriate rate limiter based on user plan
 */
export function getRateLimiter(plan?: "guest" | "free" | "pro" | "strict") {
  switch (plan) {
    case "pro":
      return proRateLimit;
    case "free":
      return freeRateLimit;
    case "strict":
      return strictRateLimit;
    case "guest":
    default:
      return guestRateLimit;
  }
}

/**
 * Check rate limit and return result
 * Use this in API routes
 */
export async function checkRateLimit(
  identifier: string,
  plan?: "guest" | "free" | "pro" | "strict"
) {
  const limiter = getRateLimiter(plan);
  const result = await limiter.limit(identifier);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
    headers: {
      "X-RateLimit-Limit": result.limit.toString(),
      "X-RateLimit-Remaining": result.remaining.toString(),
      "X-RateLimit-Reset": result.reset.toString(),
    },
  };
}