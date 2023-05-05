import express from "express";
import { addMessage, getMessages } from "../controller/message.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addmsg", addMessage);
router.get("/getmsg/:id", authMiddleware, getMessages);

export default router;
