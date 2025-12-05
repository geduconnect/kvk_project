import { db } from "../db.js"; // your db connection
import fs from "fs";

// === GET ALL VENDOR PRODUCTS ===
export const getVendorProducts = (req, res) => {
  const query = "SELECT * FROM vendor_products ORDER BY createdAt DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);

    // Parse images JSON
    const data = results.map((p) => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
    }));

    res.json(data);
  });
};

// === CREATE VENDOR PRODUCT ===
export const createVendorProduct = (req, res) => {
  try {
    const {
      product_name,
      brandName,
      description,
      category,
      oldPrice,
      newprice,
      newstock,
      status,
      createdBy = 1, // default user
    } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.filename);
    }

    const query = `
      INSERT INTO vendor_products
      (product_name, brandName, description, category, oldPrice, newprice, newstock, status, images, createdBy)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [product_name, brandName, description, category, oldPrice, newprice, newstock, status, JSON.stringify(images), createdBy],
      (err, result) => {
        if (err) {
          console.error("DB insert error:", err);
          return res.status(500).json(err);
        }
        res.status(201).json({ message: "Product created", productId: result.insertId });
      }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// === UPDATE VENDOR PRODUCT ===
export const updateVendorProduct = (req, res) => {
  const { id } = req.params;
  const { product_name, brandName, description, category, oldPrice, newprice, newstock, status } = req.body;

  // Handle new uploaded images
  let newImages = [];
  if (req.files && req.files.length > 0) {
    newImages = req.files.map((file) => file.filename);
  }

  // Get existing images first
  db.query("SELECT images FROM vendor_products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });

    const existingImages = results[0].images ? JSON.parse(results[0].images) : [];
    const finalImages = [...existingImages, ...newImages];

    const query = `
      UPDATE vendor_products
      SET product_name=?, brandName=?, description=?, category=?, oldPrice=?, newprice=?, newstock=?, status=?, images=?
      WHERE id=?
    `;

    db.query(
      query,
      [product_name, brandName, description, category, oldPrice, newprice, newstock, status, JSON.stringify(finalImages), id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product updated" });
      }
    );
  });
};

// === DELETE VENDOR PRODUCT ===
export const deleteVendorProduct = (req, res) => {
  const { id } = req.params;

  // First delete images from server
  db.query("SELECT images FROM vendor_products WHERE id=?", [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });

    const images = results[0].images ? JSON.parse(results[0].images) : [];
    images.forEach((img) => {
      const path = `uploads/${img}`;
      if (fs.existsSync(path)) fs.unlinkSync(path);
    });

    // Delete from DB
    db.query("DELETE FROM vendor_products WHERE id=?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product deleted" });
    });
  });
};
