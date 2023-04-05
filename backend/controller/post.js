import asyncHandler from "express-async-handler";
import db from "../connectDB.js";

export const createPost = asyncHandler((req, res) => {
  const queryInsertPosts = "INSERT INTO posts (`user_id`,`caption`) VALUES (?)";

  const valueOfPost = [req.user.user_id, req.body.caption];
  db.query(queryInsertPosts, [valueOfPost], (err, data) => {
    if (err) return res.status(500).json(err);
    const q = "SELECT LAST_INSERT_ID()";
    db.query(q, (err, data) => {
      const post_id = data[0]["LAST_INSERT_ID()"];
      const queryInsertImage =
        "INSERT INTO image_post (`post_id`, `image_url`) VALUES (?)";
      const valueOfImage = [post_id, req.body.image];
      db.query(queryInsertImage, [valueOfImage], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created successfully");
      });
    });
  });
});

export const getAllPostOfFollowing = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const q =
    "SELECT DISTINCT user.user_id, user.username, user.status, posts.post_id, posts.caption , image_post.image_url, posts.post_date FROM user INNER JOIN posts ON user.user_id = posts.user_id INNER JOIN image_post ON posts.post_id = image_post.post_id INNER JOIN follows ON user.user_id = follows.following_id  WHERE follows.follower_id = ? OR posts.user_id = ? ORDER BY posts.post_date DESC;";
  db.query(q, [user_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
