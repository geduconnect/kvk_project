import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_admin_secret_key";

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ msg: "Admin only" });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};
