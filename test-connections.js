require("dotenv").config({ path: ".env.local" });

console.log("");
console.log("========================================");
console.log("  CONNECTION TEST");
console.log("========================================");
console.log("");

async function testDatabase() {
  try {
    const { neon } = require("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT NOW() as time`;
    console.log("[1/2] Neon Database: CONNECTED");
    console.log("      Time:", result[0].time);
    return true;
  } catch (e) {
    console.log("[1/2] Neon Database: FAILED");
    console.log("      Error:", e.message);
    return false;
  }
}

async function testRedis() {
  try {
    const { Redis } = require("@upstash/redis");
    const redis = Redis.fromEnv();
    await redis.set("test_key", "hello_world");
    const value = await redis.get("test_key");
    await redis.del("test_key");
    console.log("[2/2] Upstash Redis: CONNECTED");
    console.log("      Value:", value);
    return true;
  } catch (e) {
    console.log("[2/2] Upstash Redis: FAILED");
    console.log("      Error:", e.message);
    return false;
  }
}

(async () => {
  const dbOk = await testDatabase();
  console.log("");
  const redisOk = await testRedis();
  console.log("");
  console.log("========================================");
  if (dbOk && redisOk) {
    console.log("  ALL TESTS PASSED! Ready for schema.ts");
  } else {
    console.log("  SOME TESTS FAILED - Fix keys in .env.local");
  }
  console.log("========================================");
  console.log("");
})();