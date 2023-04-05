import express from "express";
import authRouter from "./routes/authRoute.js";
import postRouter from "./routes/postRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
