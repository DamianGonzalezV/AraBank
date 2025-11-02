import express from "express";
import User from "../models/User.js";
import Settings from "../models/Settings.js";

const router = express.Router();

router.get("/form", async (req, res) => {
  const { username } = req;

  try {
    if (!username) {
      res.status(401).json({
        message: "Invalid token",
      });
    } else {
      // search for user data
      const userData = await User.getByUsername(username);

      // send user data
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

router.patch("/username", async (req, res) => {
  const { id } = req;
  const { newUsername } = req.body;

  if (!id) {
    res.status(401).json({
      message: "Invalid token",
    });
  } else {
    // Verify data is unique
    const isUsernameTaken = await Settings.unique(newUsername);

    if (isUsernameTaken) {
      return res.status(400).json({
        message: "Username already in use",
        data: isUsernameTaken,
      });
    } else {
      const updatedUsername = await Settings.editUsername(id, newUsername);
      console.log(updatedUsername);

      res.status(200).json({
        message: `User was updated successfully, id: ${id} from request should be the same, id from response: ${updatedUsername.id}`,
        id: updatedUsername.id,
        username: updatedUsername.username,
      });
    }
  }
});

export default router;
