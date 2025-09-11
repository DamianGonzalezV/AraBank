import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

// New accounts API
router.post("/signup", (req, res) => {
  const { name, username, email, password } = req.body;

  // Generate secure hashed password
  const hashedPassword = bcrypt.hashSync(password, 8);
  // console.log(hashedPassword);

  try {
    // Query user to users table
    const insertUser = db.prepare(`
        INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)
      `);
    const result = insertUser.run(name, username, email, hashedPassword);

    // Confirm insert into DB
    const getUser = db.prepare(`
        SELECT * FROM users WHERE id = ?
      `);
    const insertedUser = getUser.get(result.lastInsertRowid);
    console.log(`Inserted user: `, insertedUser);
    res
      .status(201)
      .send({ message: `User: ${insertedUser.username} succesfully created` });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    // search for username in db
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.all(username);
    console.log(user);

    // hash password
    const validPassword = bcrypt.compareSync(password, user[0].password);

    if (validPassword) {
      console.log(`Password is validated`);
      res.status(200).send({
        message: `User ${user[0].username} logged in`,
        user: `${user[0].username}`,
      });
    } else {
      res.status(401).send({
        message: "Unauthorized. Password is not valid.",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
