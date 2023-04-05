import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "instagramclone",
});
export default db;
