import { db } from "../db.js";

// ✅ Get all wishlist items for a user
export const getWishlist = (req, res) => {
  const { userId } = req.params;

  const q = `
SELECT w.id AS wishlistId, p.id, p.title, p.price, p.stock,
       p.brand, p.category_id AS categoryId, c.name AS categoryName,
       GROUP_CONCAT(pi.image_path) AS images
FROM wishlist w
JOIN products p ON w.product_id = p.id
LEFT JOIN product_images pi ON pi.product_id = p.id
LEFT JOIN categories c ON c.id = p.category_id
WHERE w.user_id = ?
GROUP BY p.id;

  `;

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Wishlist fetch error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(data);
  });
};

// ✅ Add to wishlist
export const addToWishlist = (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId)
    return res.status(400).json({ message: "Missing fields" });

  const check = "SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?";
  db.query(check, [userId, productId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error checking wishlist" });
    if (rows.length > 0) return res.status(200).json({ message: "Already in wishlist" });

    const q = "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)";
    db.query(q, [userId, productId], (err) => {
      if (err) {
        console.error("Add wishlist error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Added to wishlist" });
    });
  });
};

// ✅ Remove one item
export const removeWishlistItem = (req, res) => {
  const { userId, productId } = req.params;
  const q = "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?";

  db.query(q, [userId, productId], (err) => {
    if (err) {
      console.error("Remove wishlist error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Removed from wishlist" });
  });
};

// ✅ Clear wishlist
export const clearWishlist = (req, res) => {
  const { userId } = req.params;
  const q = "DELETE FROM wishlist WHERE user_id = ?";

  db.query(q, [userId], (err) => {
    if (err) {
      console.error("Clear wishlist error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Wishlist cleared" });
  });
};
