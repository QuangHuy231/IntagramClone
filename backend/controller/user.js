import expressAsyncHandler from "express-async-handler";
import db from "../connectDB.js";

export const getUserFollowed = expressAsyncHandler((req, res) => {
  const q =
    "SELECT user_id, username, status FROM user WHERE user_id IN (SELECT following_id FROM follows WHERE `follower_id` =? )";
  db.query(q, [req.user.user_id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
});

export const getUserNotFollow = expressAsyncHandler((req, res) => {
  const q =
    "SELECT user_id, username FROM user WHERE (user_id NOT IN (SELECT following_id FROM follows WHERE `follower_id` =? )) AND user_id != ?";
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
