import express from "express";
import User from "../models/User.js";
import Account from "../models/Account.js";

const router = express.Router();

// New API
router.post("/signup", async (req, res) => {
  const { name, username, email, password } = req.body;
  let user;
  console.log(name, email);

  // Check for valid email
  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Please add a valid email",
    });
  }

  try {
    // Verify uniqueness
    const unique = User.unique(username, email);
    if (unique) {
      return res.status(400).json({
        message: "Username or email already in use",
      });
    } else {
      // generate password
      const hashedPassword = User.generateSecurePassword(password);

      // create instance
      user = new User(name, username, email, hashedPassword);
      console.log(user);

      // PRISMA Insert user (returns userId)
      await user.insertUser();

      // Confirm insert into DB
      const userData = await user.getUser();

      // Create JWT token
      const token = user.createToken();

      // Send response
      res.status(201).json({
        message: `User succesfully created`,
        username: `${userData.username}`,
        token: token,
      });

      // create the instance for the Account
      const account = new Account(userData.username, userData.id);
      console.log(account);

      // Add account to accounts table
      await account.initializeAccount();

      // Set the registration bonus
      account.setInitialBalance(accountData);
      console.log(account);
    }
    //
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let user;
  console.log(username);

  // find user by username
  const result = await User.getByUsername(username);
  console.log(result);

  if (!result) {
    return res.status(401).json({
      message: "User does not exist",
    });
  } else {
    // Create the instance to access the methods
    user = new User(
      result.name,
      result.username,
      result.email,
      result.password,
      result.id
    );
  }

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
