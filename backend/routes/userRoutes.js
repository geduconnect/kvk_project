import express from "express";
import {
  getAdminUsers,
  getAdminUserById,
  addAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../controllers/userController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔒 Admin-only: manage all admin users

router.get("/", verifyAdmin, getAdminUsers); 
router.get("/:id", verifyAdmin, getAdminUserById);
router.post("/", verifyAdmin, addAdminUser);
router.put("/:id", verifyAdmin, updateAdminUser);
router.delete("/:id", verifyAdmin, deleteAdminUser);


export default router;
