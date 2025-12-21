import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

// ✅ Middleware
import { verifyAdmin, verifyCustomer } from "./middlewares/authMiddleware.js";

// ✅ Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import vendorProductRoutes from "./routes/vendorProductRoutes.js";
import vendorOrdersRoutes from "./routes/vendorOrdersRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
const app = express();

// ✅ FINAL WORKING CORS (COOKIE SAFE)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ], // your frontend
    credentials: true, // ✅ allow cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // ✅ PATCH ADDED
  })
);

app.use(cookieParser());
app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ✅ PUBLIC ROUTES
app.use("/api/auth/customer", authRoutes); // ✅ CUSTOMER AUTH
app.use("/api/admin", adminAuthRoutes); // ✅ ADMIN AUTH
app.use("/api/admin/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

// ✅ ADMIN PROTECTED ROUTES
app.use("/api/dashboard", verifyAdmin, dashboardRoutes);
app.use("/api/stock", verifyAdmin, stockRoutes);
app.use("/api/vendor/products", verifyAdmin, vendorProductRoutes);
app.use("/api/vendorOrders", verifyAdmin, vendorOrdersRoutes);

// ✅ CUSTOMER PROTECTED ROUTES
app.use("/api/admin/customers", customerRoutes);
app.use("/api/orders", orderRoutes); // ✅ THIS FIXES YOUR 404
app.use("/api/transactions", transactionRoutes);
app.use("/api/cart", verifyCustomer, cartRoutes);
app.use("/api/wishlist", verifyCustomer, wishlistRoutes);

// ✅ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ START SERVER
const PORT = 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
