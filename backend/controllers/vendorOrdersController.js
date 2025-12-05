import { db } from "../db.js"; // your MySQL connection

// Get all vendor orders
export const getVendorOrders = (req, res) => {
  const q = `
    SELECT o.*, c.name AS customerName
    FROM vendorOrders o
    LEFT JOIN customers c ON o.customerId = c.id
    ORDER BY o.date DESC
  `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Create a new vendor order
export const createVendorOrder = (req, res) => {
  const { vendorId, customerId, date, totalCost, status, items } = req.body;

  // Backend validation matching frontend checks
  if (!vendorId || !customerId) {
    return res.status(400).json({ error: "Vendor and Customer must be selected" });
  }

  if (!date) {
    return res.status(400).json({ error: "Order date is required" });
  }

  if (!items || !items.length) {
    return res.status(400).json({ error: "At least one order item is required" });
  }

  // Check items
  const invalidItem = items.find((i) => !i.description || i.amount <= 0);
  if (invalidItem) {
    return res.status(400).json({ error: "Each item must have a description and amount > 0" });
  }

  // Insert order
  const orderQuery = `
    INSERT INTO vendorOrders (vendorId, customerId, date, totalCost, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(orderQuery, [vendorId, customerId, date, totalCost, status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const orderId = result.insertId;

    // Insert items
    const itemQuery = `
      INSERT INTO vendorOrderItems (orderId, description, amount)
      VALUES ?
    `;
    const itemValues = items.map((i) => [orderId, i.description, i.amount]);

    db.query(itemQuery, [itemValues], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.status(201).json({ message: "Order created successfully", orderId });
    });
  });
};
