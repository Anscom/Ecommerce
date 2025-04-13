import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  forgotPassword,
  getProfile,
  login,
  logout,
  refreshToken,
  resetPassword,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
