import express from "express";
import Account from "../models/Account.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/balance", (req, res) => {
  const userId = req.id;
  const username = req.username;

  if (!username)
    return res.status(400).json({
      message: "Username was not found",
    });

  try {
    const userData = User.getByUsername(username);
    console.log(userData);

    // create the instance
    const account = new Account(userData.username, userData.id);
    console.log(account);

    // iniatialize db with data
    account.initializeAccount();

    // visualize db
    const accountData = account.getDataByUserId();
    console.log(accountData);
    account.setInitialBalance(accountData);
    console.log(account);

    res.status(201).json({
      message: "userData was found",
      data: accountData,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
});

export default router;
