import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import { connectDB } from "shared/config/db.js";
import { clickWorker } from "./workers/clickWorker.js";
import { flushAnalytics } from "./tasks/flushAnalytics.js";
import { downloadDB } from "./utils/downloadDB.js";

dotenv.config();

const app = express();
const FLUSH_INTERVAL_MS = 60 * 1000; // 10 seconds

// Run periodic flush
setInterval(flushAnalytics, FLUSH_INTERVAL_MS);

// Health check endpoint
app.get("/", (_, res) => {
  res.send("✅ Analytics worker service is running");
});

// Refresh MaxMind DB every 12 hours
cron.schedule("0 */12 * * *", () => {
  downloadDB();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  // downloadDB();
  console.log(`🚀 Analytics worker running on port ${PORT}`);
});
