import express from "express";
import authRouter from "./routes/authRoute.js";
import postRouter from "./routes/postRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import fs from "fs";

const app = express();

dotenv.config();
const __filename = fileURLToPath(import.meta.url);

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(dirname(__filename) + "/uploads"));

const photoMiddleware = multer({
  dest: "uploads",
});

app.post("/upload", photoMiddleware.single("photo"), (req, res) => {
  const { path, originalname } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;

  fs.renameSync(path, newPath);

  const uploadFile = newPath.replace("uploads\\", "");

  res.json(uploadFile);
});

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
