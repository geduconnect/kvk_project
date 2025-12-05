import { db } from "../db.js";

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories"); // ✅ no callback
    res.json(rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
// Add a new category
export const addCategory = (req, res) => {
  const { name } = req.body;
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "Category image is required" });
  }

  const image = req.files.image;
  const uploadPath = `uploads/${Date.now()}_${image.name}`;

  image.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const q = "INSERT INTO categories (`name`, `image`) VALUES (?, ?)";
    db.query(q, [name, `/${uploadPath}`], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        message: "Category added successfully",
        id: result.insertId,
        image: `/${uploadPath}`,
      });
    });
  });
};
// Get categories with products
export const getCategoriesWithProducts = (req, res) => {
  const q = `
    SELECT c.id AS category_id, c.name AS category_name, c.image,
           p.id AS product_id, p.name AS product_name, p.pimage, 
           p.pdescription, p.orgprice, p.disprice
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id
    ORDER BY c.id DESC
  `;

  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Group products under each category
    const categories = {};
    results.forEach(row => {
      if (!categories[row.category_id]) {
        categories[row.category_id] = {
          id: row.category_id,
          name: row.category_name,
          image: row.image,
          products: []
        };
      }
      if (row.product_id) {
        categories[row.category_id].products.push({
          id: row.product_id,
          name: row.product_name,
          pimage: row.pimage,
          pdescription: row.pdescription,
          orgprice: row.orgprice,
          disprice: row.disprice
        });
      }
    });

    res.json(Object.values(categories));
  });
};
// Get single category by ID
export const getCategoryById = (req, res) => {
  const { id } = req.params;
  const q = "SELECT * FROM categories WHERE id = ?";
  db.query(q, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Category not found" });
    res.json(results[0]);
  });
};
// Update a category
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Check if a new image is uploaded
  let q, params;

  if (req.files && req.files.image) {
    const image = req.files.image;
    const uploadPath = `uploads/${Date.now()}_${image.name}`;
    image.mv(uploadPath, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      q = "UPDATE categories SET name = ?, image = ? WHERE id = ?";
      params = [name, `/${uploadPath}`, id];

      db.query(q, params, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Category updated successfully", image: `/${uploadPath}` });
      });
    });
  } else {
    // No new image, update only name
    q = "UPDATE categories SET name = ? WHERE id = ?";
    params = [name, id];

    db.query(q, params, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Category updated successfully" });
    });
  }
};
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting category:", err);
      return res.status(500).json({ error: "Database error while deleting category" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ success: true, message: "Category deleted successfully" });
  });
};
// Get single category with products by ID
export const getCategoryWithProductsById = (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT c.id AS category_id, c.name AS category_name, c.image,
           p.id AS product_id, p.name AS product_name, p.pimage,
           p.pdescription, p.orgprice, p.disprice
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id
    WHERE c.id = ?
  `;

  db.query(q, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results.length) return res.status(404).json({ error: "Category not found" });

    const category = {
      id: results[0].category_id,
      name: results[0].category_name,
      image: results[0].image,
      products: []
    };

    results.forEach(row => {
      if (row.product_id) {
        category.products.push({
          id: row.product_id,
          name: row.product_name,
          pimage: row.pimage,
          pdescription: row.pdescription,
          orgprice: row.orgprice,
          disprice: row.disprice
        });
      }
    });

    res.json(category);
  });
};

// Get products by category
export const getCategoryProducts = (req, res) => {
  const { categoryId } = req.params;

  const sql = `
    SELECT 
      p.id,
      p.name,
      p.pdescription,
      p.pimage,
      p.orgprice,
      p.disprice
    FROM products AS p
    WHERE p.category_id = ?
    ORDER BY p.id DESC
  `;

  db.query(sql, [categoryId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(200).json({ products: [] });
    }

    // If you want, you can also send the category info
    const categoryInfo = {
      id: categoryId,
      name: results[0].category_name || "Category", // optional
      products: results,
    };

    res.json(categoryInfo);
  });
};
