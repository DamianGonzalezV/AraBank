import express from "express";
import User from "../models/User.js";
import Account from "../models/Account.js";

const router = express.Router();

// New API
router.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;
  let user;

  // Verify uniqueness
  const isUsernameTaken = await User.isUsernameTaken(username);
  console.log(isUsernameTaken);
  const isEmailTaken = await User.isEmailTaken(email);

  // if not unique an object is returned
  if (isUsernameTaken) {
    return res.status(409).json({
      message: "Username already in use",
    });
  }

  if (isEmailTaken) {
    return res.status(409).json({
      message: "Email already in use",
    });
  }

  try {
    // generate password
    const hashedPassword = User.generateSecurePassword(password);

    // create instance
    user = new User(name, username, email, hashedPassword);

    // PRISMA Insert user (returns userId filled)
    await user.insertUser();

    // Confirm insert into DB and store user data to use it in account
    const userData = await user.getUser();

    // Create JWT token
    const token = user.createToken();

    // create the instance for the Account
    const account = new Account(userData.username, userData.id);

    // Add account to accounts table
    await account.initializeAccount();

    // Send response
    res.status(201).json({
      message: `User successfully created`,
      username: `${userData.username}`,
      email: `${userData.email}`,
      token: token,
    });

    //
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let user;

  // find user by username
  const usernameObject = await User.isUsernameTaken(username);

  if (!usernameObject) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }

  try {
    // Create the instance to access the methods
    user = new User(
      result.name,
      result.username,
      result.email,
      result.password,
      result.id,
    );

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
