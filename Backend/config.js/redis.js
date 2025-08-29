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
  return redis;
};

export const clickQueue = new Queue("clicks", {
  connection: {
    host: process.env.REDIS_URL,
    port: 6379,
    password: process.env.UPSTASH_REDIS_REST_TOKEN,
    tls: {},
  },
});
