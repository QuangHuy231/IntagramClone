import asyncHandler from "express-async-handler";
import db from "../connectDB.js";

export const createPost = asyncHandler((req, res) => {
  const queryInsertPosts =
    "INSERT INTO posts (`user_id`,`caption`, `image_url`) VALUES (?)";

  const valueOfPost = [req.user.user_id, req.body.caption, req.body.image_url];
  db.query(queryInsertPosts, [valueOfPost], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data.insertId);
  });
});

export const updatePost = asyncHandler((req, res) => {
  const queryUpdatePost =
    "UPDATE posts SET `caption` = ?, `image_url` = ?, `post_date` = CURRENT_TIMESTAMP() WHERE `post_id` = ? AND `user_id` = ?";

  const valuesToUpdate = [
    req.body.caption,
    req.body.image_url,
    req.params.post_id,
    req.user.user_id,
  ];
  db.query(queryUpdatePost, valuesToUpdate, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("Post not found");
    return res.json("Post has been updated successfully");
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const queryDeletePost = "DELETE FROM posts WHERE post_id = ? AND user_id = ?";
  const result = await db.query(queryDeletePost, [
    req.params.post_id,
    req.user.user_id,
  ]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.json("Post has been deleted successfully");
});

export const getAllPostOfFollowing = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const q = `SELECT DISTINCT user.user_id, user.username, user.status, user.image_avt, posts.post_id, 
  posts.caption , posts.image_url, posts.post_date, COUNT(likes.post_id) AS num_likes, 
  COUNT(comments.post_id) AS num_comments FROM user INNER JOIN posts ON user.user_id = posts.user_id 
  LEFT JOIN likes ON posts.post_id = likes.post_id 
  LEFT JOIN comments ON posts.post_id = comments.post_id 
  LEFT JOIN follows ON user.user_id = follows.following_id 
  WHERE follows.follower_id = ? OR posts.user_id = ? 
  GROUP BY posts.post_id ORDER BY posts.post_date DESC`;
  db.query(q, [user_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const getDetailPost = asyncHandler((req, res) => {
  const { post_id } = req.params;
  const q = `SELECT user.user_id, user.username, user.status, user.image_avt, posts.post_id, posts.caption , 
  posts.image_url, posts.post_date, COUNT(likes.post_id) AS num_likes, 
  COUNT(comments.post_id) AS num_comments FROM posts INNER JOIN user ON user.user_id = posts.user_id 
  LEFT JOIN likes ON posts.post_id = likes.post_id LEFT JOIN comments ON posts.post_id = comments.post_id 
  WHERE posts.post_id = ? GROUP BY posts.post_id `;
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export const getUsersLikePost = asyncHandler((req, res) => {
  const { post_id } = req.params;
  const q = `SELECT user.user_id, user.username, user.image_avt FROM user INNER JOIN likes ON user.user_id = likes.user_id
     WHERE likes.post_id = ?`;
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const getUsersCommentPost = asyncHandler((req, res) => {
  const { post_id } = req.params;
  const q = `SELECT user.user_id, user.username, user.status, user.image_avt, comments.comment_id, comments.comment 
    FROM user INNER JOIN comments ON user.user_id = comments.user_id WHERE comments.post_id = ? ORDER BY comments.comment_date DESC`;
  db.query(q, [post_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const likePost = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const { post_id } = req.params;
  const q = "INSERT INTO likes (user_id,post_id) VALUES (?,?)";
  db.query(q, [user_id, post_id], (err, data) => {
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

export const getPostsUserCreate = asyncHandler((req, res) => {
  const { user_id } = req.params;
  const q = `SELECT user.user_id, user.username, user.image_avt, posts.post_id, 
  posts.caption , posts.image_url, posts.post_date, COUNT(likes.post_id) AS num_likes, 
  COUNT(comments.post_id) AS num_comments FROM posts  
  INNER JOIN user ON user.user_id = posts.user_id
  LEFT JOIN likes ON posts.post_id = likes.post_id 
  LEFT JOIN comments ON posts.post_id = comments.post_id  
  WHERE posts.user_id = ?
  GROUP BY posts.post_id ORDER BY posts.post_date DESC`;
  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const getPostsUserLike = asyncHandler((req, res) => {
  const { user_id } = req.params;
  const q = `SELECT DISTINCT user.user_id, user.username, user.status, user.image_avt, posts.post_id, posts.image_url, 
  like_date, COUNT(likes.post_id) AS num_likes, 
  COUNT(comments.post_id) AS num_comments FROM user 
  INNER JOIN posts ON user.user_id = posts.user_id 
  LEFT JOIN likes ON posts.post_id = likes.post_id 
  LEFT JOIN comments ON posts.post_id = comments.post_id 
  WHERE likes.user_id = ? 
  GROUP BY posts.post_id ORDER BY likes.like_date DESC`;

  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

export const searchPosts = asyncHandler((req, res) => {
  const { searchTerm } = req.query;

  const q = `SELECT user.user_id, user.username, user.status, user.image_avt, 
    posts.post_id, posts.caption, posts.image_url, posts.post_date, COUNT(likes.post_id) AS num_likes,
    COUNT(comments.post_id) AS num_comments
    FROM posts INNER JOIN user ON posts.user_id = user.user_id
    LEFT JOIN likes ON posts.post_id = likes.post_id
    LEFT JOIN comments ON posts.post_id = comments.post_id
    WHERE caption LIKE '%${searchTerm}%' OR user.username LIKE '%${searchTerm}%' AND posts.post_id IS NOT NULL GROUP BY posts.post_id ORDER BY posts.post_date DESC`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
