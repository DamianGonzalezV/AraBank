import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class User {
  constructor(name, username, email, password) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;

    // Initialize userId
    this.userId = null;
  }

  insertUser() {
    const prepareUser = db.prepare(
      `INSERT INTO users(name, username, email, password) VALUES(?, ?, ?, ?)`
    );
    const insertedUser = prepareUser.run(
      this.name,
      this.username,
      this.email,
      this.password
    );
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

  static generateSecurePassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  static getByUsername(username) {
    const prepareUsername = db.prepare(
      `SELECT * FROM users WHERE username = ?`
    );
    const result = prepareUsername.all(username);
    console.log(result);
    return result;
  }

  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  static unique(username) {
    const prepareSearch = db.prepare(
      `SELECT * FROM users WHERE username = ? OR email = ?`
    );
    const result = prepareSearch.all(username);
    return result;
  }
}
