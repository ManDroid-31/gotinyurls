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
app.set("trust proxy", true);

app.get("/", async (req, res) => {
  await redis.set("hello", req.ip);
  res.send("Shortify API OK : " + (await redis.get("hello")));
});

app.use("/api/auth", authRoutes);

app.use("/api/url", urlRoutes);

app.use("/", redirectRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`)
  );
});
