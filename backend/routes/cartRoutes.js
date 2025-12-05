import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// /api/cart/:customerId → GET cart items
router.get("/:customerId", getCart);

// /api/cart → POST add to cart
router.post("/", addToCart);

// /api/cart/:customerId/:productId → PUT update quantity
router.put("/:customerId/:productId", updateCartItem);

// /api/cart/:customerId/:productId → DELETE remove one item
router.delete("/:customerId/:productId", removeFromCart);

// /api/cart/:customerId → DELETE clear cart
router.delete("/:customerId", clearCart);

export default router;
