import { db } from "../db.js";

// ✅ Get stock summary by category name
export const getStockByCategory = (req, res) => {
  const { categoryName } = req.params;
  const q = `
    SELECT 
      SUM(CASE WHEN stock > 0 THEN 1 ELSE 0 END) as inStock,
      SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) as outStock
    FROM products
    WHERE category_name = ?
  `;

  db.query(q, [categoryName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(results[0]); // { inStock: X, outStock: Y }
  });
};
