import mongoose from "mongoose";

const dailyClickSchema = new mongoose.Schema({
  date: { type: String, required: true },
  clicks: { type: Number, default: 0 },
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  alias: { type: String },
  clicks: { type: Number, default: 0 }, // total clicks
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dailyClicks: [dailyClickSchema], // embedded daily analytics
  createdAt: { type: Date, default: Date.now },
});

// urlSchema.index({ shortUrl: 1 }, { unique: true });

const Url = mongoose.model("Url", urlSchema);
export default Url;
