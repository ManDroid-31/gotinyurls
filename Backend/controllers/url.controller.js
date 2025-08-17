import Url from "../models/Url.js";
import { nanoid } from "nanoid";
import User from "../models/User.js";

export const shortenUrl = async (req, res) => {

  try {
    const { originalUrl, alias, email } = req.body;

    console.log("Request body:", req.body);

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }
    // Check if alias already exists
    if (alias != '') {
      const existing = await Url.findOne({ alias });
      if (existing) {
        return res.status(400).json({ message: "Alias already in use" });
      }
    }

    const shortUrl = alias || nanoid(4); 

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     const newUrl = await Url.create({
      originalUrl,
      shortUrl,
      alias: alias || null,
      user: user._id,
    });

    res.status(201).json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
