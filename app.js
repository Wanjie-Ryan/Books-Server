const express = require("express");
const app = express();
const port = 3003;
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/allbooks", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/bookdetails", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json({ err });
    return res.status(201).json({ message: "Book has been created", values });
  });
});

app.delete("/deletebook/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "DELETE FROM books WHERE id= ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json({ err });
    return res.status(201).json({ message: "Book has been deleted", data });
  });
});

app.put("/updatebook/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "UPDATE books SET `title= ?, `desc` =? `cover` =? WHERE id =?";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.status(500).json({ err });
    return res.status(201).json({ message: "Book has been updated", data });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
