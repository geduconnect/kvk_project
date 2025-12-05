import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Ensure secrets exist
if (!process.env.JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not set in .env. Generate one using: crypto.randomBytes(64).toString('hex')"
  );
}

if (!process.env.REFRESH_SECRET) {
  throw new Error(
    "REFRESH_SECRET is not set in .env. Generate one using: crypto.randomBytes(64).toString('hex')"
  );
}

// Access Token
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
  );
};

// Refresh Token
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_EXPIRES_IN || "7d" }
  );
};
