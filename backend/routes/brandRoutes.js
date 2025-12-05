import express from "express";
import multer from "multer";
import {
  getAllBrands,
  getBrandById,
  // getBrandsByCategory,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

const router = express.Router();

// ✅ Multer config
const upload = multer({ dest: "uploads/" });

// Routes
router.get("/", getAllBrands);
router.get("/brands/:id", getBrandById); // ✅ THIS FIXES YOUR 404
router.post("/", upload.single("image"), createBrand);
router.put("/:id", upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);

export default router;
