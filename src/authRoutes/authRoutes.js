import express from "express";
const router = express.Router();
import { userAccounts } from "../server.js";

// New accounts API
router.post("/signup", (req, res) => {
  const newUser = req.body;
  userAccounts.push(newUser);
  res.status(201).json(newUser);
});

export default router;
