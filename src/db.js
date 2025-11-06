import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

// Create table for users
db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
`);

// Create table for account
db.exec(`
  CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_balance INTEGER NOT NULL
  )
`);

// // Create table for movements
// db.exec(`
//     CREATE TABLE movements(
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user_id INTEGER,
//       description TEXT NOT NULL,
//       movement INTEGER NOT NULL,
//       FOREIGN KEY(user_id) REFERENCES users(id)
//   )
// `);

export default db;
