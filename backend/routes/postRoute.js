import express from "express";
import { createPost, getAllPostOfFollowing } from "../controller/post.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-post", authMiddleware, createPost);
router.get(
  "/get-post-of-user-following",
  authMiddleware,
  getAllPostOfFollowing
);

export default router;
