import authMiddleware from "../middleware/auth.js";
import {
  shortenUrl,
  getUserUrls,
  getAnalytics,
} from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.post("/shorten", authMiddleware, shortenUrl);

router.get("/user-urls", authMiddleware, getUserUrls);

router.get("/analytics", authMiddleware, getAnalytics);

export default router;
