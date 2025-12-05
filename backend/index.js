// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import productRoutes from "./routes/productRoutes.js"; // adjust path if needed

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Routes
// app.use("/api/products", productRoutes);

// // ✅ Error Logger Middleware (shows exact error in console and response)
// app.use((err, req, res, next) => {
//   console.error("🔥 Backend Error:", err.stack || err); // full stack trace in terminal
//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//     stack: err.stack, // ⚠️ remove this in production
//   });
// });

// // Start Server
// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
