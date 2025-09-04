const RATE_LIMIT_WINDOW = 60;
const MAX_REQUESTS = 20;

import { redisConnect } from "shared";

const redis = redisConnect();

export const rateLimit = async (ip) => {
  const key = `rl:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW);
  }

  if (count > MAX_REQUESTS) {
    return false;
  }
  return true;
};
