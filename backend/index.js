import express from "express";
import authRouter from "./routes/authRoute.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
