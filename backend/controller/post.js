import asyncHandler from "express-async-handler";
import db from "../connectDB.js";

export const createPost = asyncHandler((req, res) => {
  const queryInsertPosts =
    "INSERT INTO posts (`user_id`,`caption`, `image_url`) VALUES (?)";

  const valueOfPost = [req.user.user_id, req.body.caption, req.body.image_url];
  db.query(queryInsertPosts, [valueOfPost], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created successfully");
  });
});

export const getAllPostOfFollowing = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const q =
    "SELECT DISTINCT user.user_id, user.username, user.status, posts.post_id, posts.caption , posts.image_url, posts.post_date, COUNT(likes.post_id) AS num_likes, COUNT(comments.post_id) AS num_comments FROM user INNER JOIN posts ON user.user_id = posts.user_id LEFT JOIN likes ON posts.post_id = likes.post_id LEFT JOIN comments ON posts.post_id = comments.post_id INNER JOIN follows ON user.user_id = follows.following_id WHERE follows.follower_id = ? OR posts.user_id = ? GROUP BY posts.post_id ORDER BY posts.post_date DESC;";
  db.query(q, [user_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const getDetailPost = asyncHandler((req, res) => {
  const { post_id } = req.params;
  const q =
    "SELECT user.user_id, user.username, user.status, posts.post_id, posts.caption , posts.image_url, posts.post_date, COUNT(likes.post_id) AS num_likes, COUNT(comments.post_id) AS num_comments FROM posts INNER JOIN user ON user.user_id = posts.user_id LEFT JOIN likes ON posts.post_id = likes.post_id LEFT JOIN comments ON posts.post_id = comments.post_id WHERE posts.post_id = ? GROUP BY posts.post_id ";
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export const getUsersLikePost = asyncHandler((req, res) => {
  const { post_id } = req.params;
  const q =
    "SELECT user.user_id, user.username FROM user INNER JOIN likes ON user.user_id = likes.user_id WHERE likes.post_id = ?";
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const getUsersCommentPost = asyncHandler((req, res) => {
  const { post_id } = req.params;
  const q =
    "SELECT user.user_id, user.username, user.status, comments.comment_id, comments.comment FROM user INNER JOIN comments ON user.user_id = comments.user_id WHERE comments.post_id = ?";
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const likePost = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const { post_id } = req.params;
  const q = "INSERT INTO likes (`user_id`,`post_id`) VALUES (?)";
  const value = [user_id, post_id];
  db.query(q, [value], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Like Success");
  });
});

export const unLikePost = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const { post_id } = req.params;
  const q = "DELETE FROM likes WHERE `user_id`= ? AND `post_id` = ?";

  db.query(q, [user_id, post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Unlike Success");
  });
});

export const addComment = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const { post_id } = req.params;
  const { comment } = req.body;
  const q = "INSERT INTO comments (`user_id`,`post_id`, `comment`) VALUES (?)";
  const value = [user_id, post_id, comment];
  db.query(q, [value], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Add Comment Success");
  });
});

export const removeComment = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const { comment_id } = req.params;
  const q = "DELETE FROM comments WHERE `user_id`= ? AND `comment_id` = ?";

  db.query(q, [user_id, comment_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Remove Success");
  });
});
