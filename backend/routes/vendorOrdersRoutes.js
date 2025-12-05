import express from "express";
import { createVendorOrder, getVendorOrders } from "../controllers/vendorOrdersController.js";

const router = express.Router();

router.post("/", createVendorOrder);
router.get("/", getVendorOrders);

export default router;
