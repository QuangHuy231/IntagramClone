import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  followUser,
  getFollowers,
  getFollowings,
  getFriends,
  getUserDetails,
  getUserFollowed,
  getUserNotFollow,
  searchUser,
  unfollowUser,
} from "../controller/user.js";

const router = express.Router();

router.get("/user-followed", authMiddleware, getUserFollowed);
router.get("/user-not-follow", authMiddleware, getUserNotFollow);
router.post("/follow-user/:id", authMiddleware, followUser);
router.post("/unfollow-user/:id", authMiddleware, unfollowUser);
router.get("/user-details/:user_id", authMiddleware, getUserDetails);
router.get("/user-follower/:user_id", authMiddleware, getFollowers);
router.get("/user-following/:user_id", authMiddleware, getFollowings);
router.get("/search", authMiddleware, searchUser);
router.get("/getfriends", authMiddleware, getFriends);
export default router;
