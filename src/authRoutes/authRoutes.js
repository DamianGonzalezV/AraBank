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

    // Create JWT token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    // Send response
    res.status(201).json({
      message: `User: ${insertedUser.username} succesfully created`,
      token: token,
    });
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

      // create token
      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
        expiresIn: "24H",
      });
      // send response
      res.status(200).json({
        message: `User ${user[0].username} logged in`,
        user: `${user[0].username}`,
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Unauthorized. Password is not valid.",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
