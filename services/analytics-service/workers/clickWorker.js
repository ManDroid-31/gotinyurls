import { Worker } from "bullmq";
import { redisConnect } from "shared/config/redis.js";
import { getLocation } from "../tasks/getLocation.js";

const redis = redisConnect();

export const clickWorker = new Worker(
  "clicks",
  async (job) => {
    const { shortUrl, ts: date, ip } = job.data;
    if (!shortUrl || !date || !ip) return;

    // Resolve region from IP

    let region = await getLocation(ip);
    if (!region) region = "Unknown";

    // Daily analytics
    const keyDaily = `analytics:${date}`;
    await redis.hincrby(keyDaily, shortUrl, 1);

    // Region analytics
    const keyRegion = `analytics:region:${date}`;
    const field = `${shortUrl}|${region}`;
    await redis.hincrby(keyRegion, field, 1);

    console.log(`[Worker] Incremented ${shortUrl} (${region}) on ${date}`);
  },
  {
    connection: {
      host: process.env.REDIS_URL,
      port: 6379,
      password: process.env.UPSTASH_REDIS_REST_TOKEN,
      tls: {},
    },
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

clickWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});
