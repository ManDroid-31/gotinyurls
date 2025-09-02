import { Queue } from "bullmq";

export const clickQueue = new Queue("clicks", {
  connection: {
    host: process.env.REDIS_URL,
    port: 6379,
    password: process.env.UPSTASH_REDIS_REST_TOKEN,
    tls: {},
  },
});
