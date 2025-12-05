// seedAdmin.js
import bcrypt from "bcryptjs";
import { db } from "./db.js";

const seedAdmin = async () => {
  try {
    const name = "superadmin";
    const email = "admin@kvk.com";
    const password = "Admin@123"; // change if needed

    // Check if admin exists in NEW admin table
    const [existing] = await db.query(
      "SELECT * FROM admin_users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      console.log("⚠️ Admin already exists. Skipping seed.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO admin_users (name, email, password, createdAt)
       VALUES (?, ?, ?, NOW())`,
      [name, email, hashedPassword]
    );

    console.log("✅ Super Admin seeded successfully!");
    console.log(`🔑 Email: ${email}`);
    console.log(`🔒 Password: ${password}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
