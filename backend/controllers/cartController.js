import { db } from "../db.js";

// ✅ Get logged-in customer's cart
export const getCart = async (req, res) => {
  console.log("🟡 GET CART HIT");
  console.log("🟡 req.customer:", req.customer);

  const customerId = req.customer?.id;

  if (!customerId) {
    console.log("🔴 customerId MISSING");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    console.log("🟡 Running DB query for customer:", customerId);

    const [rows] = await db.query(
      "SELECT * FROM cart WHERE customerId = ?",
      [customerId]
    );

    console.log("🟢 CART ROWS:", rows);
    return res.json(rows || []);
  } catch (err) {
    console.error("🔴 DB ERROR (getCart):", err);
    return res.status(500).json({ message: "Database error" });
  }
};

// ✅ Add product to cart
export const addToCart = async (req, res) => {
  console.log("✅ ADD TO CART HIT");
  console.log("👉 req.customer:", req.customer);
  console.log("👉 req.body:", req.body);

  const customerId = req.customer?.id;
  const { productId, title, price, quantity, image } = req.body;

  if (!customerId) {
    console.log("❌ customerId missing");
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (!productId) {
    console.log("❌ Missing productId");
    return res.status(400).json({ message: "Missing productId" });
  }

  const sql = `
    INSERT INTO cart (customerId, productId, title, price, quantity, image)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `;

  try {
    console.log("✅ Running SQL (addToCart)...");
    await db.query(sql, [
      customerId,
      productId,
      title,
      price,
      quantity || 1,
      image,
    ]);

    console.log("🟢 Cart insert/update success");
    return res.json({ message: "Added to cart" });
  } catch (err) {
    console.error("🔴 SQL ERROR (addToCart):", err);
    return res.status(500).json({ message: "Error adding to cart" });
  }
};

// ✅ Update quantity
export const updateCartItem = async (req, res) => {
  const customerId = req.customer?.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await db.query(
      "UPDATE cart SET quantity = ? WHERE customerId = ? AND productId = ?",
      [quantity, customerId, productId]
    );

    return res.json({ message: "Cart updated" });
  } catch (err) {
    console.error("🔴 SQL ERROR (updateCartItem):", err);
    return res.status(500).json({ message: "Error updating cart" });
  }
};

// ✅ Remove product
export const removeFromCart = async (req, res) => {
  const customerId = req.customer?.id;
  const { productId } = req.params;

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await db.query(
      "DELETE FROM cart WHERE customerId = ? AND productId = ?",
      [customerId, productId]
    );

    return res.json({ message: "Item removed" });
  } catch (err) {
    console.error("🔴 SQL ERROR (removeFromCart):", err);
    return res.status(500).json({ message: "Error removing item" });
  }
};

// ✅ Clear entire cart
export const clearCart = async (req, res) => {
  const customerId = req.customer?.id;

  if (!customerId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await db.query("DELETE FROM cart WHERE customerId = ?", [customerId]);
    return res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("🔴 SQL ERROR (clearCart):", err);
    return res.status(500).json({ message: "Error clearing cart" });
  }
};
