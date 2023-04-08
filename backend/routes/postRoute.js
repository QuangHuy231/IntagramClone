import express from "express";
import {
  addComment,
  createPost,
  deletePost,
  getAllPostOfFollowing,
  getDetailPost,
  getPostsUserCreate,
  getPostsUserLike,
  getUsersCommentPost,
  getUsersLikePost,
  likePost,
  removeComment,
  searchPosts,
  unLikePost,
  updatePost,
} from "../controller/post.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-post", authMiddleware, createPost);
router.put("/update-post/:post_id", authMiddleware, updatePost);
router.delete("/delete-post/:post_id", authMiddleware, deletePost);
router.get(
  "/get-post-of-user-following",
  authMiddleware,
  getAllPostOfFollowing
);
router.get(
  "/get-posts-user-created/:user_id",
  authMiddleware,
  getPostsUserCreate
);

router.get("/get-posts-user-like/:user_id", authMiddleware, getPostsUserLike);

router.get("/get-detail-post/:post_id", authMiddleware, getDetailPost);
router.get("/get-user-like-post/:post_id", authMiddleware, getUsersLikePost);
router.get(
  "/get-user-comment-post/:post_id",
  authMiddleware,
  getUsersCommentPost
);
router.post("/like-post/:post_id", authMiddleware, likePost);
router.post("/unlike-post/:post_id", authMiddleware, unLikePost);

router.post("/add-comment/:post_id", authMiddleware, addComment);
router.post("/remove-comment/:comment_id", authMiddleware, removeComment);

router.get("/search", authMiddleware, searchPosts);

export default router;
