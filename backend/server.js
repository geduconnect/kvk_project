import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import verifyToken, {
  verifyAdmin,
  verifyCustomer,
} from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
// ROUTES
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
const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], // your frontend
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors()); // handle preflight for all routes
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));
// ✅ Public Routes
app.use("/api/auth/customer", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

app.use("/api/dashboard", verifyAdmin, dashboardRoutes);
app.use("/api/stock", verifyAdmin, stockRoutes);
app.use("/api/vendor/products", verifyAdmin, vendorProductRoutes);
app.use("/api/vendorOrders", verifyAdmin, vendorOrdersRoutes);

// =================== CUSTOMER PROTECTED ROUTES ===================

app.use("/api/admin/customers", customerRoutes);
app.use("/api/admin/orders", orderRoutes);
app.use("/api/cart", verifyCustomer, cartRoutes);
app.use("/api/wishlist", verifyCustomer, wishlistRoutes);
// ✅ Handle Unknown Routes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server
const PORT = 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
