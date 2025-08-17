import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config.js/db.js";
import authRoutes from "./routes/auth.js";
import urlRoutes from "./routes/url.js";
import Url from "./models/Url.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);


app.get("/", (_req, res) => res.send("Shortify API OK"));

app.use("/api/auth", authRoutes);

app.use("/api/url", urlRoutes);

app.get("/:shortUrl", async (req, res) => {

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  console.log(`Redirect request from IP: ${ip}`);

  try {
    const { shortUrl } = req.params;

    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Increment total clicks
    url.clicks = (url.clicks || 0) + 1;

    // Increment date-wise clicks
    const today = new Date().toISOString().split("T")[0]; 


    // Check if today's entry exists
    const todayEntry = url.dailyClicks.find(entry => entry.date === today);

    if (todayEntry) {
      todayEntry.clicks += 1;
    } else {
      url.dailyClicks.push({ date: today, clicks: 1 });
    }

    await url.save();

    console.log(url);
    // Redirect to original URL
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});
