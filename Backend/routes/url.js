import authMiddleware from "../middleware/auth.js";
import { shortenUrl, getUserUrls } from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.post("/shorten", authMiddleware, shortenUrl);

router.get("/user-urls", authMiddleware, getUserUrls);

export default router;