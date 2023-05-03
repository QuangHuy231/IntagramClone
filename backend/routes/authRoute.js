import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controller/auth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.put("/update-profile", authMiddleware, updateUserProfile);
router.get("/get-user", authMiddleware, getUserProfile);

export default router;
