import { writeFileSync } from "fs";
import { randomBytes } from "crypto";

// Generate secrets
const jwtSecret = randomBytes(64).toString("hex");
const refreshSecret = randomBytes(64).toString("hex");

// Define .env content
const envContent = `
JWT_SECRET=${jwtSecret}
REFRESH_SECRET=${refreshSecret}
JWT_EXPIRES_IN=15m
REFRESH_EXPIRES_IN=7d
`;

// Write to .env
writeFileSync(".env", envContent.trim());

console.log("✅ .env file created with JWT_SECRET and REFRESH_SECRET");
console.log(envContent);
