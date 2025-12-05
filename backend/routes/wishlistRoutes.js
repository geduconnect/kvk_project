import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeWishlistItem,
  clearWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/:userId", getWishlist);              // Get all wishlist items
router.post("/", addToWishlist);                  // Add product
router.delete("/:userId/:productId", removeWishlistItem);  // Remove single item
router.delete("/clear/:userId", clearWishlist);   // Clear all items

export default router;
