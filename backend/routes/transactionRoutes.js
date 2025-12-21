import express from "express";
import { db } from "../db.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
  SELECT 
    t.*,
    o.customerId,
    o.orderDate,
    c.customerName
  FROM transactions t
  JOIN orders o ON t.order_id = o.id
  LEFT JOIN customers c ON o.customerId = c.id
  ORDER BY t.id DESC
`);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

export default router;
