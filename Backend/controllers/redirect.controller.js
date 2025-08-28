import Url from "../models/Url.js";
import { redisConnect } from "../config.js/redis.js";
import getDate from "../utils/getDate.js";
// import { clickQueue } from "../config.js/redis.js";

const redis = redisConnect();

export const handleRedirect = async (req, res) => {
  // const ip = req.ip;
  // not needed coz app.set('trust proxy', true);
  // const forwardedIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log(ip);

  try {
    const { shortUrl } = req.params;
    const today = getDate();

    const cachedUrl = await redis.get(`url:${shortUrl}`);

    if (cachedUrl) {
      // await redis.xadd(`url:${shortUrl}:clicks`, "*", { ip: ip, date: today });
      // await clickQueue.add("click", { shortUrl, ip, ua, ts: today });
      return res.redirect(302, cachedUrl);
    }

    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    console.log(url);

    await redis.set(`url:${shortUrl}`, url.originalUrl, "EX", 60 * 60);
    // await clickQueue.add("click", { shortUrl, ip, ua, ts: today });

    return res.redirect(302, url.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
