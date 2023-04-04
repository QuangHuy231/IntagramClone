import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "huycool2311",
  database: "instagramclone",
});
export default db;
