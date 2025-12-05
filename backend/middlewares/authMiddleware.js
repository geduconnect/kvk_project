import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "1259bb8f20d42f92ab42e27f85bdbc2a00cbc4bc80b41ba7fef1fe19ed79318ceed9d490baf649467205761e9f6e38dc71afbf13ec7edbcc6cd674c5ca530978";

/**
 * ✅ Verify token (from cookies or Authorization header)
 */


/**
 * ✅ Generic role check middleware
 */
export const verifyRole = (allowedRoles = []) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: Access denied" });
  }
  next();
};

// Verify token from cookies or Authorization header
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.customer_token || req.cookies?.admin_token || (req.headers.authorization?.split(" ")[1] || null);

  if (!token) return res.status(401).json({ error: "Unauthorized — please login" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ==================== Customer Middleware ====================
export const verifyCustomer = (req, res, next) => {
  const token = req.cookies.customer_token;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.customer = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ isAuthenticated: false });
  }
};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ message: "Admin not logged in" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid admin token" });

    req.admin = decoded;
    next();
  });
}


export default verifyToken;
