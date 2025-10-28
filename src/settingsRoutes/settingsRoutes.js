import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/form", async (req, res) => {
  const { username } = req;

  try {
    if (!username) {
      res.status(401).json({
        message: "Invalid token",
      });
    } else {
      // search for credentials
      const userData = await User.getByUsername(username);
      console.log(userData);

      // send credentials
      res.status(200).json({
        message: "userData was fetch",
        username: userData.username,
        email: userData.email,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

export default router;
