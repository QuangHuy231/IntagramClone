import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import db from "../connectDB.js";

export const authMiddleware = asyncHandler((req, res, next) => {
  const { access_token } = req.cookies;

  try {
    if (access_token) {
      const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

      const q = "SELECT * FROM user WHERE user_id = ? ";

      db.query(q, [decoded?.user_id], (err, data) => {
        req.user = data[0];
        next();
      });
    } else {
      throw new Error("No Token");
    }
  } catch (error) {
    throw new Error("Not Authorized token expired, please Login again");
  }
});
