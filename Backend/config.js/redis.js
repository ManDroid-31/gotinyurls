import { Redis } from "ioredis";
import { Queue } from "bullmq";

let redis;

export const redisConnect = () => {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
};

export const clickQueue = new Queue("clicks", {
  connection: {
    url: process.env.REDIS_URL,
  },
});
