import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { redisConnect, connectDB } from "../shared/index.js";
import { clickQueue } from "shared/config/queue.js";
import authRoutes from "./routes/auth.js";
import urlRoutes from "./routes/url.js";
import redirectRoutes from "./routes/redirect.js";

const app = express();
const redis = redisConnect();

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
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
  app.listen(PORT, async () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
});
