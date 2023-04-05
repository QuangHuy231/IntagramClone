import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  followUser,
  getUserFollowed,
  getUserNotFollow,
  unfollowUser,
} from "../controller/user.js";

const router = express.Router();

router.get("/user-followed", authMiddleware, getUserFollowed);
router.get("/user-not-follow", authMiddleware, getUserNotFollow);
router.post("/follow-user/:id", authMiddleware, followUser);
router.post("/unfollow-user/:id", authMiddleware, unfollowUser);
export default router;
