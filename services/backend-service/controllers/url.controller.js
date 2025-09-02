import { Url, UrlAnalytics } from "../../shared/index.js";
import { User } from "../../shared/index.js";
import { encodeBase62 } from "../utils/base62.js";
import QRCode from "qrcode";
import { redisConnect } from "../../shared/index.js";
import bcrypt from "bcryptjs";

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
    const analytics = await UrlAnalytics.find({
      shortUrl: { $in: shortUrls },
    }).lean();

    console.log("Analytics:", analytics);

    res.status(200).json({ urls, analytics });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
