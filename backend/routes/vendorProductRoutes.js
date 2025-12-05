import express from "express";
import {
  getVendorProducts,
  createVendorProduct,
  updateVendorProduct,
  deleteVendorProduct
} from "../controllers/vendorProductController.js";

const router = express.Router();

// Routes
router.get("/", getVendorProducts);                 // Get all vendor products
router.post("/", createVendorProduct);             // Create product (files handled in controller)
router.put("/:id", updateVendorProduct);           // Update product
router.delete("/:id", deleteVendorProduct);        // Delete product

export default router;
