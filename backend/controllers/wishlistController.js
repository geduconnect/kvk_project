import { db } from "../db.js";

// ✅ Get wishlist (COOKIE BASED)
export const getWishlist = async (req, res) => {
  try {
    const customerId = req.customer.id;

    const q = `
      SELECT 
        w.id AS wishlistId,
        p.id,
        p.title,
        p.price,
        p.stock,
        p.brand,
        p.category_id AS categoryId,
        p.images,
        c.name AS categoryName
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE w.user_id = ?
      ORDER BY w.id DESC
    `;

    const [rows] = await db.query(q, [customerId]);

    const parsed = rows.map((item) => ({
      ...item,
      images: item.images ? JSON.parse(item.images) : [],
    }));

    res.json(parsed);
  } catch (err) {
    console.error("❌ Wishlist fetch error:", err);
    res.status(500).json({ message: "Wishlist fetch failed" });
  }
};

// ✅ Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Missing productId" });
    }

    const check = "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?";
    const [exists] = await db.query(check, [customerId, productId]);

    if (exists.length > 0) {
      return res.json({ message: "Already in wishlist" });
    }

    const q = "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)";
    await db.query(q, [customerId, productId]);

    res.json({ message: "Added to wishlist" });
  } catch (err) {
    console.error("❌ Add wishlist error:", err);
    res.status(500).json({ message: "Add to wishlist failed" });
  }
};

// ✅ Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { productId } = req.params;

    const q = "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?";
    await db.query(q, [customerId, productId]);

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("❌ Remove wishlist error:", err);
    res.status(500).json({ message: "Remove wishlist failed" });
  }
};

// ✅ Clear wishlist
export const clearWishlist = async (req, res) => {
  try {
    const customerId = req.customer.id;

    const q = "DELETE FROM wishlist WHERE user_id = ?";
    await db.query(q, [customerId]);

    res.json({ message: "Wishlist cleared" });
  } catch (err) {
    console.error("❌ Clear wishlist error:", err);
    res.status(500).json({ message: "Clear wishlist failed" });
  }
};
