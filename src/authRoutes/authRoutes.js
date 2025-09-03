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
    // Inter user to users table
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
  } catch (err) {
    console.log(err);
  }
});

export default router;
