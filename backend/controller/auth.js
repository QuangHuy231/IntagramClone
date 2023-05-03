import db from "../connectDB.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";
import asyncHandler from "express-async-handler";

export const register = asyncHandler((req, res) => {
  const q = "SELECT * FROM `user` WHERE `email` = ? OR `username` = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //hash the password and create a user

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO user(`username`,`email`,`password`) VALUES (?)";

    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
});

export const login = asyncHandler((req, res) => {
  // CHECK USERNAME

  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.status(404).json("User not found!");

    // CHECK PASSWORD

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong email or password");
    let user_id = data[0].user_id;
    const q = "UPDATE user SET status = 'active' WHERE `user_id` = ?";

    db.query(q, [user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      const q = "SELECT * FROM user WHERE `user_id` = ?";
      db.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...other } = data[0];

        res
          .cookie("access_token", generateToken(data[0].user_id), {
            httpOnly: true,
          })
          .status(200)
          .json(other);
      });
    });
  });
});
export const logout = asyncHandler((req, res) => {
  const q = "UPDATE user SET status = 'inactive' WHERE `user_id` = ?";
  db.query(q, [req.user.user_id], (err, data) => {
    if (err) return res.status(500).json(err);
  });
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
});

export const updateUserProfile = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const { username, email, password, image_avt } = req.body;
  const q = "SELECT * FROM user WHERE user_id = ?";

  db.query(q, [user_id], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) return res.status(404).json("User not found!");

    // CHECK PASSWORD

    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

    if (!isPasswordCorrect || data[0].email !== email)
      return res.status(400).json("Wrong email or password");
    let user_id = data[0].user_id;

    const q = "UPDATE user SET  username = ?, image_avt= ? WHERE `user_id` = ?";

    db.query(q, [username, image_avt, user_id], (err, data) => {
      if (err) return res.status(500).json(err);
      const q = "SELECT * FROM user WHERE `user_id` = ?";
      db.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...other } = data[0];

        res
          .cookie("access_token", generateToken(data[0].user_id), {
            httpOnly: true,
          })
          .status(200)
          .json(other);
      });
    });
  });
});

export const getUserProfile = asyncHandler((req, res) => {
  const { user_id } = req.user;
  const q = "SELECT * FROM user WHERE `user_id` = ?";
  db.query(q, [user_id], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...other } = data[0];
    res.status(200).json(other);
  });
});
