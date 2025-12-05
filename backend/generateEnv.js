// generateEnv.js
import fs from "fs";
import crypto from "crypto";

const envContent = `
JWT_SECRET=${crypto.randomBytes(64).toString("hex")}
REFRESH_SECRET=${crypto.randomBytes(64).toString("hex")}
JWT_EXPIRES_IN=15m
REFRESH_EXPIRES_IN=7d
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
`;

fs.writeFileSync(".env", envContent.trim());
console.log(".env file created successfully with JWT secrets!");
