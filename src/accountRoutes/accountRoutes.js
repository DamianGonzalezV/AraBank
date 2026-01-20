import express from "express";
import Account from "../models/Account.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/balance", async (req, res) => {
  const userId = req.id;
  const username = req.username;
  // const token = req.headers["authorization"];

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
