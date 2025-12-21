// seedCustomer.js
import bcrypt from "bcryptjs";
import { db } from "./db.js";

const seedCustomer = async () => {
  try {
    const customerName = "Farhan";
    const email = "farhan@kvk.com";
    const password = "Farhan@123"; // Plain password
    const role = "customer";         // optional if you track role

    // Check if customer already exists
    const [existing] = await db.query("SELECT * FROM customers WHERE email = ?", [email]);
    if (existing.length > 0) {
      console.log("⚠️ Customer already exists. Skipping seed.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO customers (customerName, email, password) VALUES (?, ?, ?)",
      [customerName, email, hashedPassword]
    );

    console.log("✅ Customer seeded successfully!");
    console.log(`🔑 Email: ${email}`);
    console.log(`🔒 Password: ${password}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding customer:", err);
    process.exit(1);
  }
};

seedCustomer();
