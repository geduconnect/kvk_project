import express from "express";
import {
  addOrder,
  // addOrderItem,
  getOrders,
  getOrdersByCustomer,
  getOrderById,
  // updateOrderItem,
  updateOrder,
  // deleteOrderItem,
  getCustomerOrderSummary,
  // placeOrderFromCart
} from "../controllers/ordersController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Basic CRUD
router.get("/", verifyAdmin, getOrders);          // ✅ Get all orders
router.get("/:id", verifyAdmin, getOrderById);    // ✅ Get 
router.put("/:id", updateOrder);
router.post("/", addOrder);

// Customer orders
router.get("/customer/:customerId", getOrdersByCustomer);
router.get("/customer-summary", getCustomerOrderSummary);

// router.post("/:orderId/items", addOrderItem);
// router.put("/:orderId/items/:itemIdx", updateOrderItem);
// router.delete("/:orderId/items/:itemId", deleteOrderItem);

// router.post("/checkout/:customerId", placeOrderFromCart);

export default router;
