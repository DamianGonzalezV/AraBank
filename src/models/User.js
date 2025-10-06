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

  static getByUsername(username) {
    const prepareUsername = db.prepare(
      `SELECT * FROM users WHERE username = ?`
    );
    return prepareUsername.get(username);
  }

  // Previous insert with sqlite
  // insertUser() {
  //   const prepareUser = db.prepare(
  //     `INSERT INTO users(name, username, email, password) VALUES(?, ?, ?, ?)`
  //   );
  //   const insertedUser = prepareUser.run(
  //     this.name,
  //     this.username,
  //     this.email,
  //     this.password
  //   );
  //   this.userId = insertedUser.lastInsertRowid;
  //   return this.userId;
  // }

  // New insert with prisma
  insertUser() {
    const user = prisma.user.create({
      data: {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      },
    });
    // set this.userId to the last insert row id with prisma
    // return this.userId
  }

  getUser() {
    const retrieveUser = db.prepare(`SELECT * FROM users WHERE id = ?`);
    return retrieveUser.get(this.userId);
  }

  createToken() {
    return jwt.sign(
      { id: this.userId, username: this.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
  }

  static generateSecurePassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  comparePassword(password) {
    console.log(`User model: ${password}, ${this.password}`);
    return bcrypt.compareSync(password, this.password);
  }

  static unique(username, email) {
    const prepareSearch = db.prepare(
      `SELECT * FROM users WHERE username = ? OR email = ?`
    );
    console.log(username, email);
    const result = prepareSearch.all(username, email);
    return result;
  }
}
