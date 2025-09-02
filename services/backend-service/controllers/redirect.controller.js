import Url from "../../shared/models/Url.js";
import { redisConnect } from "../../shared/index.js";
import { clickQueue } from "shared/config/queue.js";
import getDate from "../utils/getDate.js";
import {
  POS_KEY,
  NEG_KEY,
  POS_TTL_SECONDS,
  NEG_TTL_SECONDS,
} from "../utils/redis.js";

const redis = redisConnect();

export const handleRedirect = async (req, res) => {
  const ip = req.ip;
  // not needed coz app.set('trust proxy', true);
  const forwardedIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(ip);
  console.log("ForwardedIP: ", forwardedIp);

  try {
    const { shortUrl } = req.params;
    const today = getDate();

    const cachedUrl = await redis.get(POS_KEY(shortUrl));

    // Positive Cache
    if (cachedUrl) {
      await clickQueue.add(
        "click",
        { shortUrl, ip, ts: today },
        {
          removeOnComplete: true,
          removeOnFail: 20,
          attempts: 5,
          backoff: { type: "exponential", delay: 2000 },
        }
      );
      return res.redirect(302, cachedUrl);
    }

    // Negative Cache
    const neg = await redis.get(NEG_KEY(shortUrl));
    if (neg) {
      return res.status(404).json({ message: "URL not found" });
    }

    // DB Lookup
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      await redis.set(NEG_KEY(shortUrl), "1", { ex: NEG_TTL_SECONDS });
      return res.status(404).json({ message: "URL not found" });
    }

    // Populate Cache
    await redis.set(POS_KEY(shortUrl), url.originalUrl, {
      ex: POS_TTL_SECONDS,
    });

    await clickQueue.add("click", { shortUrl, ip, ts: today });
    return res.redirect(302, url.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
