import { Redis } from "@upstash/redis";
import { Queue } from "bullmq";

let redis;

export const redisConnect = () => {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  console.log("Redis Connected");
  return redis;
};
