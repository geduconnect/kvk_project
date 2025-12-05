// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIEtWSyIsImVtYWlsIjoiYWRtaW5Aa3ZrLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTk1MTE2NSwiZXhwIjoxNzYwMDM3NTY1fQ.n5OkRH7l5EQJXvO_Xvm25S6GFQfPv4VIJboVwP87RDQ";


export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
};
