import mongoose from "mongoose";

const dailyClickSchema = new mongoose.Schema({
  date: { type: String, required: true },
  clicks: { type: Number, default: 0 },
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  alias: { type: String },
  title: { type: String },
  clicks: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date },
  enableQr: { type: Boolean, default: false },
  enablePassword: { type: Boolean, default: false },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  qrCode: { type: String },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
