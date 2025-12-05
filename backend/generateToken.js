import jwt from "jsonwebtoken";

// Secret key (keep this safe, use .env in production)
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIEtWSyIsImVtYWlsIjoiYWRtaW5Aa3ZrLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1OTk1MTE2NSwiZXhwIjoxNzYwMDM3NTY1fQ.n5OkRH7l5EQJXvO_Xvm25S6GFQfPv4VIJboVwP87RDQ";

// Example payload (user/admin info)
const payload = {
  id: 1,           // user ID from database
  name: "Admin KVK",
  email: "admin@kvk.com",
  role: "admin"    // or "user"
};

// Options (token expiration)
const options = {
  expiresIn: "1d", // token valid for 1 day
};

// Generate token
const token = jwt.sign(payload, JWT_SECRET, options);

console.log("Generated JWT Token:");
console.log(token);
