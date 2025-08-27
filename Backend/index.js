import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config.js/db.js";
import { redisConnect } from "./config.js/redis.js";
import authRoutes from "./routes/auth.js";
import urlRoutes from "./routes/url.js";
import redirectRoutes from "./routes/redirect.js";

const app = express();
const redis = redisConnect();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.set('trust proxy', true);

app.get("/", async (req, res) => {
    await redis.set("hello", req.ip);
    res.send("Shortify API OK : " + await redis.get("hello"));
});

app.use("/api/auth", authRoutes);

app.use("/api/url", urlRoutes);

app.use("/", redirectRoutes);

// app.get("/:shortUrl", async (req, res) => {

//   const ip = req.ip;

  

//   console.log(`req.ip: ${ip}`);

//   try {
//     const { shortUrl } = req.params;

//     const url = await Url.findOne({ shortUrl });

//     if (!url) {
//       return res.status(404).json({ message: "URL not found" });
//     }

//     // Increment total clicks
//     url.clicks = (url.clicks || 0) + 1;

//     // Increment date-wise clicks
//     const today = new Date().toISOString().split("T")[0]; 


//     // Check if today's entry exists
//     const todayEntry = url.dailyClicks.find(entry => entry.date === today);

//     if (todayEntry) {
//       todayEntry.clicks += 1;
//     } else {
//       url.dailyClicks.push({ date: today, clicks: 1 });
//     }

//     await url.save();

//     // Redirect to original URL
//     res.redirect(302, url.originalUrl);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});