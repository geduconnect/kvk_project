import express from "express";
import {
  getCategories,
  addCategory,
  getCategoriesWithProducts,
  getCategoryById,
  getCategoryWithProductsById,
  updateCategory,
  getCategoryProducts,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// GET all categories
router.get("/", getCategories);

// GET single category
router.get("/:id", getCategoryById);

// POST new category
router.post("/", addCategory);

// PUT update category
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);


// GET categories with products
router.get("/categories/products", getCategoriesWithProducts);
// GET single category with products
router.get("/categories/products/:id", getCategoryWithProductsById);
router.get("/categories/products/:categoryId", getCategoryProducts);
export default router;
