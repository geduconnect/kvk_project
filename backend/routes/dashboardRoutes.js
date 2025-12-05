import express from "express";
import {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getCustomerSummary,
} from "../controllers/dashboardController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Only admin should access these
router.get("/stats", verifyAdmin, getDashboardStats);
router.get("/recent-orders", verifyAdmin, getRecentOrders);
router.get("/top-products", verifyAdmin, getTopProducts);
router.get("/customer-summary", verifyAdmin, getCustomerSummary);

export default router;
