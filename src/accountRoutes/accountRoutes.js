import express from "express";
import Account from "../models/Account.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/balance", async (req, res) => {
  const userId = req.id;
  const username = req.username;
  const token = req.headers["authorization"]; // for debug, hide later

  console.log(userId);
  console.log(username);
  console.log(token); // for debug, hide later

  if (!userId)
    return res.status(400).json({
      message: `userId ${userId} was not found`,
    });

  try {
    // visualize db
    const accountData = await Account.getAccountByUserId(userId, username);
    console.log(accountData);

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
