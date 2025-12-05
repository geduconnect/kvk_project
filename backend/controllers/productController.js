import { db } from "../db.js";
import fs from "fs";
import path from "path";

/** Utility to safely run a DB query */
const runQuery = async (query, params = []) => {
  try {
    const [rows] = await db.query(query, params);
    return rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

/** Ensure upload folder exists */
const ensureUploadDir = () => {
  const uploadDir = path.resolve("uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  return uploadDir;
};

/** ✅ Upload Product */
export const uploadProduct = async (req, res) => {
  try {
    console.log("📥 Incoming upload:", req.body, req.files);

    const { title, brand, description, category_id, oldPrice, price, stock, status } = req.body;
    const uploadDir = ensureUploadDir();

    const images = [];
    if (req.files?.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      for (const file of files) {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        await file.mv(filePath);
        images.push(`/uploads/${fileName}`);
      }
    }

    const result = await runQuery(
      `INSERT INTO products 
        (title, brand, description, category_id, oldPrice, price, stock, status, images) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, brand, description, category_id, oldPrice, price, stock, status, JSON.stringify(images)]
    );

    res.status(201).json({ message: "✅ Product created successfully", id: result.insertId });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Failed to upload product" });
  }
};

/** ✅ Get All Products with Category Info */
export const getProducts = async (req, res) => {
  try {
    const q = `
      SELECT p.*, c.name AS category_name, c.image AS category_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.createdAt DESC
    `;
    const results = await runQuery(q);

    const parsed = results.map((p) => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
    }));

    res.json(parsed);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Get Categories with Products */
export const getCategoriesWithProducts = async (req, res) => {
  try {
    const q = `
      SELECT c.id AS category_id, c.name AS category_name, c.image,
             p.id AS product_id, p.title AS product_name, p.images AS pimages,
             p.price, p.oldPrice, p.description,
             p.size, p.weight, p.type, p.mfg, p.tags, p.life
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      ORDER BY c.id DESC
    `;
    const results = await runQuery(q);

    const categories = {};
    results.forEach((r) => {
      if (!categories[r.category_id]) {
        categories[r.category_id] = {
          id: r.category_id,
          name: r.category_name,
          image: r.image,
          products: [],
        };
      }
      if (r.product_id) {
        categories[r.category_id].products.push({
          id: r.product_id,
          name: r.product_name,
          price: r.price,
          oldPrice: r.oldPrice,
          description: r.description,
          images: r.pimages ? JSON.parse(r.pimages) : [],
          size: r.size,
          weight: r.weight,
          type: r.type,
          mfg: r.mfg,
          tags: r.tags,
          life: r.life,
        });
      }
    });

    res.json(Object.values(categories));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Get Product by ID */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      SELECT p.*, c.name AS category_name, c.image AS category_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const results = await runQuery(sql, [id]);

    if (results.length === 0) return res.status(404).json({ message: "Product not found" });

    const p = results[0];
    res.json({ ...p, images: JSON.parse(p.images || "[]") });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Update Product */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = [
      "title",
      "brand",
      "description",
      "category_id",
      "oldPrice",
      "price",
      "stock",
      "status",
      "size",
      "weight",
      "type",
      "mfg",
      "tags",
      "life",
    ];
    const values = fields.map((f) => req.body[f] ?? null);

    const sql = `
      UPDATE products SET 
        title=?, brand=?, description=?, category_id=?, oldPrice=?, price=?, stock=?, status=?, 
        size=?, weight=?, type=?, mfg=?, tags=?, life=? 
      WHERE id=?`;
    const result = await runQuery(sql, [...values, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "✅ Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Delete Product */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await runQuery("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "🗑️ Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Toggle Popular */
export const togglePopular = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_popular } = req.body;
    await runQuery("UPDATE products SET is_popular = ? WHERE id = ?", [is_popular ? 1 : 0, id]);
    res.json({ success: true, message: "⭐ Popular status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Get Popular Products Grouped by Category */
export const getPopularProductsByCategory = async (req, res) => {
  try {
    const sql = `
      SELECT p.*, c.name AS category_name, c.image AS category_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_popular = 1
      ORDER BY c.id, p.createdAt DESC
    `;
    const results = await runQuery(sql);

    const categories = [];
    results.forEach((p) => {
      let cat = categories.find((c) => c.id === p.category_id);
      if (!cat) {
        cat = { id: p.category_id, name: p.category_name, image: p.category_image, products: [] };
        categories.push(cat);
      }
      cat.products.push({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price,
        oldPrice: p.oldPrice,
        images: p.images ? JSON.parse(p.images) : [],
      });
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Toggle Daily Deal */
export const toggleDailyDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_daily_deal, daily_deal_price } = req.body;
    await runQuery(
      "UPDATE products SET is_daily_deal=?, daily_deal_price=? WHERE id=?",
      [is_daily_deal ? 1 : 0, daily_deal_price || null, id]
    );
    res.json({ message: "🔥 Daily deal updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Get Daily Deals */
export const getDailyDeals = async (req, res) => {
  try {
    const sql = `
      SELECT * FROM products
      WHERE is_daily_deal = 1
        AND (daily_deal_end IS NULL OR daily_deal_end > NOW())
      ORDER BY daily_deal_end ASC
    `;
    const results = await runQuery(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Update Daily Deal Price */
export const updateDailyDealPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    if (!price || isNaN(price)) return res.status(400).json({ message: "Invalid price" });

    const result = await runQuery("UPDATE products SET daily_deal_price = ? WHERE id = ?", [price, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, message: "💰 Daily deal price updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/** ✅ Update Product Status */
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await runQuery("UPDATE products SET status = ? WHERE id = ?", [status, id]);
    res.json({ success: true, message: "🟢 Status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
