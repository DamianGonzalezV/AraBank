import express from "express";
import User from "../models/User.js";

const router = express.Router();

// New API
router.post("/signup", (req, res) => {
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
      // return 409: conflict with the state/date on the server
      return res.status(409).json({
        message: "Username or email already in use",
      });
    }

    // Insert user (returns userId)
    const insertedUser = user.insertUser();

    // Confirm insert into DB
    const userData = user.getUser(insertedUser);

    // Create JWT token
    const token = user.createToken();

    // Send response
    res.status(201).json({
      message: `User succesfully created`,
      username: `${userData.username}`,
      email: `${userData.email}`,

      token: token,
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, typeof username);

  // find user by username
  const result = User.getByUsername(username);
  console.log(result);

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
    console.log(result.password, password);
    const validPassword = user.comparePassword(password);
    console.log(validPassword);

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
