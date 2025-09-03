import mongoose from "mongoose";

const urlRegionAnalyticsSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true, index: true },
  date: { type: String, required: true, index: true },
  region: { type: String, required: true, index: true }, // e.g. "IN", "US"
  clicks: { type: Number, default: 0 },
  lat: { type: Number }, // Latitude
  lng: { type: Number }, // Longitude
});

export default mongoose.model("UrlRegionAnalytics", urlRegionAnalyticsSchema);
