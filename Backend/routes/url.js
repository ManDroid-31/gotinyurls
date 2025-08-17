import authMiddleware from "../middleware/auth.js";
import { shortenUrl } from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.post("/shorten", shortenUrl);

export default router;