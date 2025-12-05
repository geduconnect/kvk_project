import { db } from "../db.js";
import bcrypt from "bcryptjs";

// 🧩 Get all admin users
export const getAdminUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, role, created_at AS createdAt FROM admin_users"
    );
    res.status(200).json({ users: rows });
  } catch (error) {
    console.error("❌ Error fetching admin users:", error);
    res.status(500).json({ error: "Failed to fetch admin users" });
  }
};

// 👤 Get single admin user
export const getAdminUserById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, role, created_at AS createdAt FROM admin_users WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Admin user not found" });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching admin user:", error);
    res.status(500).json({ error: "Failed to fetch admin user" });
  }
};

// ➕ Add admin user
export const addAdminUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
  `INSERT INTO admin_users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())`,
  [name, email, hashedPassword, role || "admin"]
);
    res.status(201).json({ message: "✅ Admin user added successfully" });
  } catch (error) {
    console.error("❌ Error adding admin user:", error);
    res.status(500).json({ error: "Failed to add admin user" });
  }
};

// ✏️ Update admin user
export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const [result] = await db.query(
      `UPDATE admin_users SET name=?, email=?, role=? WHERE id=?`
      [name, email, role, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Admin user not found" });

    res.status(200).json({ message: "✅ Admin user updated successfully" });
  } catch (error) {
    console.error("❌ Error updating admin user:", error);
    res.status(500).json({ error: "Failed to update admin user" });
  }
};

// 🗑️ Delete admin user
export const deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM admin_users WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Admin user not found" });

    res.status(200).json({ message: "✅ Admin user deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting admin user:", error);
    res.status(500).json({ error: "Failed to delete admin user" });
  }
};
