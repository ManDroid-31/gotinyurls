import mongoose from "mongoose";

const urlAnalyticsSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true, index: true },
  date: { type: String, required: true, index: true },
  clicks: { type: Number, default: 0 },
});

export default mongoose.model("UrlAnalytics", urlAnalyticsSchema);
