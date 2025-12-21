import express from "express";
import upload from "../middleware/upload.js";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  getBrandsByCategory,
} from "../controllers/brandController.js";

const router = express.Router();

router.post("/", upload.single("image"), createBrand); // ✅ IMAGE UPLOAD
router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.put("/:id", upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);

export default router;
