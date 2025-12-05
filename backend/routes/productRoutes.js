import express from "express";
import {
  uploadProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCategoriesWithProducts,
  togglePopular,
  getPopularProductsByCategory,
  // getPopularProducts,
  toggleDailyDeal,
  updateDailyDealPrice,
  getDailyDeals,
  updateStatus,
} from "../controllers/productController.js";

const router = express.Router();
router.get("/dailydeals", getDailyDeals);
router.patch("/:id/dailydeal", toggleDailyDeal);
router.patch("/:id/dailydeal/price", updateDailyDealPrice);
// POST (create new product)

// GET (all products)
router.get("/", getProducts);

// GET single product
router.get("/:id", getProductById);
router.post("/", uploadProduct);

// PUT (update)
router.put("/:id", updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

// Extra routes
router.get("/categories/with-products", getCategoriesWithProducts);
router.patch("/:id/popular", togglePopular);
// router.get("/popular", getPopularProducts);
router.get("/popular/by-category", getPopularProductsByCategory);

// ✅ Put fixed routes first

router.patch("/:id/status", updateStatus);

export default router;
