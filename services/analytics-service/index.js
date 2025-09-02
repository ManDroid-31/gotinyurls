import express from "express";
import dotenv from "dotenv";
import { connectDB } from "shared/config/db.js";
import UrlAnalytics from "shared/models/UrlAnalytics.js";
import { Worker } from "bullmq";
import { Redis } from "@upstash/redis";
import { redisConnect } from "shared/config/redis.js";
dotenv.config();

const app = express();
const redis = redisConnect();

// Worker
const worker = new Worker(
  "clicks",
  async (job) => {
    const { shortUrl, ts, ip } = job.data;
    if (!shortUrl || !ts || !ip) return;

    // Key = daily bucket
    const key = `analytics:${ts}`;

    // Field = shortUrl, Value = clicks
    await redis.hincrby(key, shortUrl, 1);
    return Promise.resolve();
  },
  {
    connection: {
      host: process.env.REDIS_URL,
      port: 6379,
      password: process.env.UPSTASH_REDIS_REST_TOKEN,
      tls: {},
    },
    // concurrency: 100,
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: 50,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    },
  }
);

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

const FLUSH_INTERVAL = 60 * 1000;

async function flushAnalytics() {
  // Find all keys like "analytics:YYYY-MM-DD"
  const keys = await redis.keys("analytics:*");
  if (keys.length === 0) return;

  for (const key of keys) {
    const date = key.split(":")[1]; // extract YYYY-MM-DD
    const data = await redis.hgetall(key);

    console.log("Flushing data for", date, data);

    if (!data || Object.keys(data).length === 0) continue;

    const bulkOps = Object.entries(data).map(([shortUrl, count]) => ({
      updateOne: {
        filter: { shortUrl, date },
        update: { $inc: { clicks: parseInt(count, 10) } },
        upsert: true,
      },
    }));

    console.log("Bulk Ops:", bulkOps);
    if (bulkOps.length > 0) {
      await UrlAnalytics.bulkWrite(bulkOps);
      console.log(`✅ Flushed ${bulkOps.length} entries for ${date}`);
      await redis.del(key); // clear after flush
    }
  }
}

// Run periodically
setInterval(flushAnalytics, FLUSH_INTERVAL);

app.listen(3001, async () => {
  await connectDB();

  console.log("Analytics worker service running on port 3001");
});
