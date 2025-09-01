import { Url, UrlAnalytics } from "../../shared/index.js";
import { User } from "../../shared/index.js";
import { encodeBase62 } from "../utils/base62.js";
import { redisConnect } from "../../shared/index.js";

const redis = redisConnect();

export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl, alias, email } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }

    // If alias is provided, ensure it's unique
    if (alias && alias.trim() !== "") {
      const existing = await Url.findOne({ alias });
      if (existing) {
        return res.status(400).json({ message: "Alias already in use" });
      }
    }

    // Find user
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let shortUrl;
    if (alias && alias.trim() !== "") {
      shortUrl = alias;
    } else {
      // Get unique counter from Redis
      const counter = await redis.incr("url_counter");
      shortUrl = encodeBase62(counter);
    }

    // const dailyClicks = [];
    // for (let i = 6; i >= 0; i--) {
    //   const date = new Date();
    //   date.setDate(date.getDate() - i);
    //   const formattedDate = date.toISOString().split("T")[0];
    //   dailyClicks.push({ date: formattedDate, clicks: 0 });
    // }

    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
      alias: alias || null,
      user: user._id,
      // dailyClicks,
    });

    res.status(201).json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urls = await Url.find({ user: user._id }).lean();
    const shortUrls = urls.map((u) => u.shortUrl);
    const analytics = await UrlAnalytics.find({
      shortUrl: { $in: shortUrls },
    }).lean();

    console.log("Analytics:", analytics);

    res.status(200).json({ urls, analytics });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
