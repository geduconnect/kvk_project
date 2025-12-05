import { db } from "../db.js";

// Get all items in a customer's cart
export const getCart = (req, res) => {
  const { customerId } = req.params;
  db.query("SELECT * FROM cart WHERE customerId = ?", [customerId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
};

// Add product to cart (insert or increase qty)
export const addToCart = (req, res) => {
  const { customerId, productId, title, price, quantity, image } = req.body;
  if (!customerId || !productId)
    return res.status(400).json({ message: "Missing customerId or productId" });

  const sql = `
    INSERT INTO cart (customerId, productId, title, price, quantity, image)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `;
  db.query(sql, [customerId, productId, title, price, quantity || 1, image], (err) => {
    if (err) return res.status(500).json({ message: "Error adding to cart" });
    res.json({ message: "Added to cart" });
  });
};

// Update quantity directly
export const updateCartItem = (req, res) => {
  const { customerId, productId } = req.params;
  const { quantity } = req.body;
  db.query(
    "UPDATE cart SET quantity = ? WHERE customerId = ? AND productId = ?",
    [quantity, customerId, productId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error updating cart" });
      res.json({ message: "Cart updated" });
    }
  );
};

// Remove a product from cart
export const removeFromCart = (req, res) => {
  const { customerId, productId } = req.params;
  db.query(
    "DELETE FROM cart WHERE customerId = ? AND productId = ?",
    [customerId, productId],
    (err) => {
      if (err) return res.status(500).json({ message: "Error removing item" });
      res.json({ message: "Item removed" });
    }
  );
};

// Clear entire cart
export const clearCart = (req, res) => {
  const { customerId } = req.params;
  db.query("DELETE FROM cart WHERE customerId = ?", [customerId], (err) => {
    if (err) return res.status(500).json({ message: "Error clearing cart" });
    res.json({ message: "Cart cleared" });
  });
};
