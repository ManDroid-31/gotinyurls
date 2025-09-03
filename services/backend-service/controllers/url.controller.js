import { Url, UrlAnalytics, UrlRegionAnalytics } from "../../shared/index.js";
import { User } from "../../shared/index.js";
import { encodeBase62 } from "../utils/base62.js";
import QRCode from "qrcode";
import { redisConnect } from "../../shared/index.js";
import bcrypt from "bcryptjs";
import { toLocalDate } from "../utils/formatDate.js";

const redis = redisConnect();

export const shortenUrl = async (req, res) => {
  try {
    const {
      originalUrl,
      email,
      title,
      alias,
      expiry,
      enableQr,
      password,
      enablePassword,
    } = req.body.payload;

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If alias is provided, ensure it's unique
    if (alias && alias.trim() !== "") {
      const existing = await Url.findOne({ alias });
      if (existing) {
        return res.status(400).json({ message: "Alias already in use" });
      }
    }

    // Generate short URL
    let shortUrl;
    if (alias && alias.trim() !== "") {
      shortUrl = alias.trim();
    } else {
      const counter = await redis.incr("url_counter");
      shortUrl = encodeBase62(counter);
    }

    // Handle password protection
    let hashedPassword = null;
    if (enablePassword && password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Expiry date
    let expiresAt = null;
    if (expiry) {
      expiresAt = new Date(expiry);
    }

    let qrCode = null;

    if (enableQr) {
      const url = process.env.BACKEND_URL + "/" + shortUrl;
      qrCode = await QRCode.toDataURL(url);
    }

    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
      alias: alias || null,
      title: title || null,
      user: user._id,
      expiresAt,
      enableQr: !!enableQr,
      enablePassword: !!enablePassword,
      password: hashedPassword,
      qrCode: qrCode,
    });

    res.status(201).json({
      message: "Short URL created successfully",
      shortUrl,
      url: newUrl,
      qrCode,
    });
  } catch (err) {
    console.error("Error in shortenUrl:", err);
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

    const dailyAnalytics = await UrlAnalytics.find({
      shortUrl: { $in: shortUrls },
    }).lean();

    const regionAnalytics = await UrlRegionAnalytics.find({
      shortUrl: { $in: shortUrls },
    }).lean();

    console.log(regionAnalytics);
    res.status(200).json({ urls, dailyAnalytics, regionAnalytics });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { email, startDate, endDate, selectedUrl } = req.query;

    let start = null,
      end = null;

    if (startDate) {
      start = toLocalDate(startDate);
    }

    if (endDate) {
      end = toLocalDate(endDate);
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("start : ", start, " end: ", end, " url: ", selectedUrl);

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const urls = await Url.find({ user: user._id }).lean();
    const shortUrls = urls.map((u) => u.shortUrl);

    if (!start && !end && !selectedUrl) {
      // Date-based analytics: aggregate clicks per date for all user's URLs
      const dateAnalytics = await UrlAnalytics.aggregate([
        { $match: { shortUrl: { $in: shortUrls } } },
        {
          $group: {
            _id: "$date",
            clicks: { $sum: "$clicks" },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            clicks: 1,
          },
        },
        { $sort: { date: -1 } },
      ]);

      // Region-based analytics: aggregate clicks per region for all user's URLs
      const regionAnalytics = await UrlRegionAnalytics.aggregate([
        { $match: { shortUrl: { $in: shortUrls } } },
        {
          $group: {
            _id: "$region", // group only by region
            clicks: { $sum: "$clicks" }, // sum clicks
            lat: { $first: "$lat" }, // pick first lat
            lng: { $first: "$lng" }, // pick first lng
          },
        },
        {
          $project: {
            _id: 0,
            region: "$_id",
            lat: 1,
            lng: 1,
            size: "$clicks",
          },
        },
        { $sort: { size: -1 } },
      ]);

      // console.log("urls : ", urls);

      // console.log("Date: ", dateAnalytics);
      console.log("Region: ", regionAnalytics);

      return res.status(200).json({
        // urls,
        points: regionAnalytics,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
