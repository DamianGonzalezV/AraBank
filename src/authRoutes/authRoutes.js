import express from "express";
const router = express.Router();
import { userAccounts } from "../server.js";

// New accounts API
router.post("/signup", (req, res) => {
  userAccounts.push(req.body);
  res.sendStatus(200);
  console.log(userAccounts);
});

export default router;
