import express from "express";
import { handleRedirect } from "../controllers/redirect.controller.js";

const router = express.Router();

// Catch-all shortUrl redirect route
router.get("/:shortUrl", handleRedirect);

export default router;
