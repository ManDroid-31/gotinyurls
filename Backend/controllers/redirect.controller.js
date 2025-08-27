import Url from "../models/Url.js";
import { redisConnect } from "../config.js/redis.js";
import getDate from "../utils/getDate.js";

const redis = redisConnect();

export const handleRedirect = async (req, res) => {
  const ip = req.ip;
  // not needed coz app.set('trust proxy', true);
  // const forwardedIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  

  try {
    const { shortUrl } = req.params;
    const today = getDate();

    const cachedUrl = await redis.get(`url:${shortUrl}`);

    if (cachedUrl) {
      await redis.xadd(`url:${shortUrl}:clicks`, '*', { 'ip' : ip , 'date' : today });
      return res.redirect(302, cachedUrl);
    }

    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // url.clicks = (url.clicks || 0) + 1;

    
    // const todayEntry = url.dailyClicks.find(entry => entry.date === today);

    // if (todayEntry) {
    //   todayEntry.clicks += 1;
    // } else {
    //   url.dailyClicks.push({ date: today, clicks: 1 });
    // }

    // await url.save();

    console.log(url);

    await redis.set(`url:${shortUrl}`, url.originalUrl);

   await redis.xadd(`url:${shortUrl}:clicks`, '*', { 'ip' : ip , 'date' : today });

    return res.redirect(302, url.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
