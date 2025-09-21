import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class User {
  constructor(userId, user, username, email, password) {
    this.userId = userId;
    this.user = user;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  generateSecurePassword(password) {
    this.password = bcrypt.hashSync(password, 8);
    return this.password;
  }

  insertUser(name, username, email, password) {
    const prepareUser = db.prepare(
      `INSERT INTO users(name, username, email, password) VALUES(?, ?, ?, ?)`
    );
    const insertedUser = prepareUser.run(name, username, email, password);
    this.userId = insertedUser.lastInsertRowid;
    return this.userId;
  }

  getUser() {
    const retrieveUser = db.prepare(`SELECT * FROM users WHERE id = ?`);
    return retrieveUser.get(this.userId);
  }

  createToken() {
    return jwt.sign({ id: this.userId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  }
}
