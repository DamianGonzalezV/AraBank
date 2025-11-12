// import db from "../db.js";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* 
Style guide

- Static Methods should be after the constructor

*/
export default class User {
  constructor(name, username, email, password, userId = null) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;

    // Initialize userId
    this.userId = userId;
  }

  static async getByUsername(username) {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  }

  static async isUsernameUnique(username) {
    const unique = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    return unique;
  }

  static async isEmailUnique(email) {
    const unique = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return unique;
  }

  static generateSecurePassword(password) {
    return bcrypt.hashSync(password, 8);
  }

  // New insert with prisma
  async insertUser() {
    const user = await prisma.users.create({
      data: {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      },
    });
    this.userId = user.id; // null is replaced with userId of the inserted record
  }

  async getUser() {
    const user = await prisma.users.findUnique({
      where: {
        id: this.userId,
      },
    });
    return user;
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

  comparePassword(password) {
    console.log(`User model: ${password}, ${this.password}`);
    return bcrypt.compareSync(password, this.password);
  }
}
