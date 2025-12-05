import express from "express";
import { getStockByCategory } from "../controllers/stockController.js";

const router = express.Router();

// 🔹 GET stock by category
router.get("/:categoryName", getStockByCategory);

export default router;
