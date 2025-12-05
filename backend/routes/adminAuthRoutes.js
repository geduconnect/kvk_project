import express from "express";
import {
  adminLogin,
  getAdminProfile,
  checkAdminAuth,
  adminLogout,
} from "../controllers/adminAuthController.js";

import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);
router.get("/check-auth", verifyAdmin, checkAdminAuth);
// Admin profile
router.get("/profile", verifyAdmin, getAdminProfile);

// Logout
router.post("/logout", adminLogout);

export default router;
