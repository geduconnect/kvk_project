import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "1259bb8f20d42f92ab42e27f85bdbc2a00cbc4bc80b41ba7fef1fe19ed79318ceed9d490baf649467205761e9f6e38dc71afbf13ec7edbcc6cd674c5ca530978";

/**
 * 🧩 Get all customers (Admin only)
 * Includes totalOrders and totalSpent from orders table
 */
export const getCustomers = async (req, res) => {
  try {
    const { sort } = req.query;

    const query = `
  SELECT 
    c.id,
    c.customerName,
    c.email,
    c.mobile,
    c.address,
    c.city,
    c.state,
    c.pincode,
    c.createdAt,
    IFNULL(o.totalOrders, 0) AS totalOrders,
    IFNULL(o.totalSpent, 0) AS totalSpent
  FROM customers c
  LEFT JOIN (
    SELECT customerId, COUNT(*) AS totalOrders, SUM(totalCost) AS totalSpent
    FROM orders
    GROUP BY customerId
  ) o ON c.id = o.customerId
  ${sort === "oldest" ? "ORDER BY c.id ASC" : "ORDER BY c.id DESC"}
`;

    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

/**
 * 👤 Get single customer (Admin or the same customer)
 */
export const getCustomerById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, customerName, email, mobile, address, city, state, pincode, createdAt 
       FROM customers 
       WHERE id = ?`,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Customer not found" });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching customer:", error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};

/**
 * 📝 Create (Signup) new customer — public route
 */
export const createCustomer = async (req, res) => {
  try {
    const {
      customerName,
      email,
      mobile,
      address,
      city,
      state,
      pincode,
      password,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !mobile ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [existing] = await db.query(
      "SELECT id FROM customers WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO customers 
       (customerName, email, mobile, address, city, state, pincode, password, role, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'customer', NOW())`,
      [customerName, email, mobile, address, city, state, pincode, hashedPassword]
    );

    const newCustomerId = result.insertId;

    const token = jwt.sign(
      { id: newCustomerId, role: "customer" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({ message: "✅ Signup successful!", token, id: newCustomerId });
  } catch (error) {
    console.error("❌ Error adding customer:", error);
    res.status(500).json({ error: "Failed to sign up" });
  }
};

/**
 * ✏️ Update customer (Admin or the same user)
 */
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customerName,
      email,
      mobile,
      address,
      city,
      state,
      pincode,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !mobile ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [existing] = await db.query(
      "SELECT id FROM customers WHERE email = ? AND id != ?",
      [email, id]
    );

    if (existing.length > 0)
      return res.status(400).json({ error: "Email already exists" });

    const [result] = await db.query(
      `UPDATE customers 
       SET customerName=?, email=?, mobile=?, address=?, city=?, state=?, pincode=?
       WHERE id=?`,
      [customerName, email, mobile, address, city, state, pincode, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Customer not found" });

    res.status(200).json({ message: "✅ Customer updated successfully" });
  } catch (error) {
    console.error("❌ Error updating customer:", error);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

/**
 * 🗑️ Delete customer (Admin or the same user)
 */
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM customers WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Customer not found" });

    res.status(200).json({ message: "✅ Customer deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting customer:", error);
    res.status(500).json({ error: "Failed to delete customer" });
  }
};
