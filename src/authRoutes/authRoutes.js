import express from "express";
import User from "../models/User.js";

const router = express.Router();

// New accounts API
router.post("/signup", (req, res) => {
  const { name, username, email, password } = req.body;

  // create instance
  const user = new User(name, username, email, password);

  // generate password
  const hashedPassword = user.generateSecurePassword(password);

  try {
    // Verify uniqueness
    const unique = User.unique(username, email);
    if (unique.length > 0) {
      return res.status(400).json({
        message: "Username or email already in use",
      });
    }

    // Insert user (returns userId)
    const insertedUser = user.insertUser(name, username, email, hashedPassword);

    // Confirm insert into DB
    const getUserId = user.getUser(insertedUser);

    // Create JWT token
    const token = user.createToken(getUserId);

    // Send response
    res.status(201).json({
      message: `User succesfully created`,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, typeof username);

  // find user by username
  const result = User.getByUsername(username);

  const user = new User(
    result[0].id,
    result[0].name,
    result[0].username,
    result[0].email,
    result[0].password
  );

  try {
    // hash password
    const validPassword = user.comparePassword(password);

    if (validPassword) {
      // create token
      const token = user.createToken();

      // send response
      res.status(200).json({
        message: `User ${user.username} logged in`,
        user: `${user.username}`,
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
