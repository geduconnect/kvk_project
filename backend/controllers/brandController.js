// controllers/brandController.js
import { db } from "../db.js";

// =============================
// CREATE BRAND
// =============================
export const createBrand = async (req, res) => {
  try {
    const { brand_name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!brand_name) {
      return res.status(400).json({ error: "Brand name is required" });
    }

    await db.query("INSERT INTO brands (brand_name, image) VALUES (?, ?)", [
      brand_name,
      image,
    ]);

    res.json({ message: "Brand added successfully" });
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ error: "Failed to create brand" });
  }
};

// =============================
// UPDATE BRAND
// =============================

// ✅ GET ALL BRANDS
export const getAllBrands = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, brand_name, image FROM brands ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
};

// ✅ GET SINGLE BRAND BY ID ✅✅✅ (THIS FIXES YOUR ERROR)
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id, brand_name, image FROM brands WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching brand:", error);
    res.status(500).json({ error: "Failed to fetch brand" });
  }
};


// ✅ GET BRANDS BY CATEGORY
export const getBrandsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const [rows] = await db.query(
      `
        SELECT DISTINCT b.id, b.brand_name, b.image
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN brands b ON p.brand = b.brand_name
        WHERE c.category_name = ?
      `,
      [categoryName]
    );

    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching brands by category:", error);
    res.status(500).json({ error: "Failed to fetch brands for category" });
  }
};

// ✅ CREATE BRAND (WITH IMAGE)

// ✅ UPDATE BRAND (WITH OPTIONAL IMAGE)
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand_name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (image) {
      await db.query(
        "UPDATE brands SET brand_name = ?, image = ? WHERE id = ?",
        [brand_name, image, id]
      );
    } else {
      await db.query("UPDATE brands SET brand_name = ? WHERE id = ?", [
        brand_name,
        id,
      ]);
    }

    res.json({ message: "✅ Brand updated successfully" });
  } catch (error) {
    console.error("❌ Error updating brand:", error);
    res.status(500).json({ error: "Failed to update brand" });
  }
};

// ✅ DELETE BRAND
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM brands WHERE id = ?", [id]);

    res.json({ message: "✅ Brand deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting brand:", error);
    res.status(500).json({ error: "Failed to delete brand" });
  }
};
