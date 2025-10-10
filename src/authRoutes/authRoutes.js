import express from "express";
import User from "../models/User.js";

const router = express.Router();

// New API
router.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;
  console.log(name, email);

  // Check for valid email
  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Please add a valid email",
    });
  }

  // generate password
  const hashedPassword = User.generateSecurePassword(password);

  // create instance
  const user = new User(name, username, email, hashedPassword);
  console.log(user);

  try {
    // Verify uniqueness
    const unique = User.unique(username, email);
    if (unique.length > 0) {
      return res.status(400).json({
        message: "Username or email already in use",
      });
    }

    // PRISMA Insert user (returns userId)
    await user.insertUser();

    // Confirm insert into DB
    const userData = await user.getUser(insertedUser);

    // Create JWT token
    const token = user.createToken();

    // Send response
    res.status(201).json({
      message: `User succesfully created`,
      username: `${userData.username}`,
      token: token,
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // find user by username
  const result = User.getByUsername(username);

  if (!result) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }

  const user = new User(
    result.name,
    result.username,
    result.email,
    result.password
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
        username: `${user.username}`,
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Unauthorized. Password is not valid",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

export default router;
