import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "1259bb8f20d42f92ab42e27f85bdbc2a00cbc4bc80b41ba7fef1fe19ed79318ceed9d490baf649467205761e9f6e38dc71afbf13ec7edbcc6cd674c5ca530978";

export const adminLogin = async (req, res) => {
  console.log("Admin login hit:", req.body);
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM admin_users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    const admin = rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // ✅ Create token
    const token = jwt.sign({ id: admin.id, role: "admin" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Set httpOnly cookie
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Respond with basic admin info
    return res.json({
      message: "Admin logged in",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAdminAuth = (req, res) => {
  return res.json({ isAuthenticated: true, user: req.admin });
};

export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const [rows] = await db.query(
      "SELECT id, name, createdAt FROM admin_users WHERE id = ?",
      [adminId]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Admin not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Admin profile error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const adminLogout = (req, res) => {
  res.clearCookie("admin_token");
  res.json({ message: "Logged out successfully" });
};
