import expressAsyncHandler from "express-async-handler";
import db from "../connectDB.js";

export const addMessage = expressAsyncHandler((req, res) => {
  const { receiver_id, sender_id, message_text } = req.body;

  const q = `INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)`;

  db.query(q, [sender_id, receiver_id, message_text], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json("Gửi thành công");
  });
});

export const getMessages = expressAsyncHandler((req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const q = `SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at`;

  db.query(q, [user_id, id, id, user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    const projectedMessages = result.map((message) => {
      return {
        message_id: message.message_id,
        fromSelf: message.sender_id === user_id,
        message: message.message_text,
      };
    });
    res.json(projectedMessages);
  });
});
