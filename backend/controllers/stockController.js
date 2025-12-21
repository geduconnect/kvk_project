import { db } from "../db.js";

// ✅ Get stock summary by category name

export const getStockByCategory = (req, res) => {
  const { categoryId } = req.params;

  const q = `
    SELECT 
      SUM(CASE WHEN stock > 0 THEN 1 ELSE 0 END) AS inStock,
      SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) AS outStock
    FROM products
    WHERE category_id = ?
  `;

  db.query(q, [categoryId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};
