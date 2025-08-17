import express from "express";
import { registerUser, loginUser, verifyToken } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

router.get("/verify", verifyToken);

export default router;
