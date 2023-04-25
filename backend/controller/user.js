import expressAsyncHandler from "express-async-handler";
import db from "../connectDB.js";

export const getUserFollowed = expressAsyncHandler((req, res) => {
  const q = `SELECT user_id, username, status, image_avt FROM user WHERE user_id 
  IN (SELECT following_id FROM follows WHERE follower_id =? )`;
  db.query(q, [req.user.user_id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
});

export const getUserNotFollow = expressAsyncHandler((req, res) => {
  const q = `SELECT user_id, username, status, image_avt FROM user WHERE (user_id NOT IN 
    (SELECT following_id FROM follows WHERE follower_id =? )) AND user_id != ?`;
  db.query(q, [req.user.user_id, req.user.user_id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
});

export const followUser = expressAsyncHandler((req, res) => {
  const following_id = req.params.id;

  const follower_id = req.user.user_id;
  const value = [follower_id, following_id];
  const q = "INSERT INTO follows (`follower_id`,`following_id`) VALUES (?)";
  db.query(q, [value], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Follow Success");
  });
});

export const unfollowUser = expressAsyncHandler((req, res) => {
  const unfollowing_id = req.params.id;

  const unfollower_id = req.user.user_id;

  const q = "DELETE FROM follows WHERE `follower_id`=? AND `following_id`=?";
  db.query(q, [unfollower_id, unfollowing_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Unfollow Success");
  });
});

export const getUserDetails = expressAsyncHandler((req, res) => {
  const { user_id } = req.params;
  const q = `
    SELECT user_id, username, status, image_avt,
      (SELECT COUNT(*) FROM posts WHERE user_id = ?) AS num_posts,
      (SELECT COUNT(*) FROM follows WHERE follower_id = ?) AS num_followers,
      (SELECT COUNT(*) FROM follows WHERE following_id = ?) AS num_following
    FROM 
      user
    WHERE 
      user_id = ?
  `;
  db.query(q, [user_id, user_id, user_id, user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
});

export const getFollowers = expressAsyncHandler((req, res) => {
  const { user_id } = req.params;
  const q = `
  SELECT  user.user_id, user.username, user.status, user.image_avt
  FROM user 
  JOIN follows  ON user.user_id = follows.follower_id
  WHERE follows.following_id = ?`;
  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export const getFollowings = expressAsyncHandler((req, res) => {
  const { user_id } = req.params;
  const q = `
  SELECT  user.user_id, user.username, user.status, user.image_avt
  FROM user 
  JOIN follows  ON user.user_id = follows.following_id
  WHERE follows.follower_id = ?`;
  db.query(q, user_id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export const searchUser = expressAsyncHandler((req, res) => {
  const { searchTerm } = req.query;
  const { user_id } = req.user;
  const q = `SELECT user_id, username, status, image_avt FROM user 
  WhERE username LIKE '%${searchTerm}%' AND user_id != '${user_id}'`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});
