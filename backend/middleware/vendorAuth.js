import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const verifyVendor = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check role
    const q = "SELECT role FROM users WHERE id = ?";
    db.query(q, [decoded.id], (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", err });
      if (result.length === 0 || result[0].role !== "vendor") {
        return res.status(403).json({ message: "Access denied. Not a vendor." });
      }
      next();
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
