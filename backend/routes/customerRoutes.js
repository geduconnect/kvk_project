import express from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  // customerLogin,
  // customerLogout,
} from "../controllers/customerController.js";

import { verifyAdmin, verifyCustomer } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.post("/signup", createCustomer);


// Admin only
router.get("/", verifyAdmin, getCustomers);

// Admin or same customer
router.get("/:id", verifyCustomer, getCustomerById);
router.put("/:id", verifyCustomer, updateCustomer);
router.delete("/:id", verifyCustomer, deleteCustomer);

export default router;
