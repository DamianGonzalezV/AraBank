import express from "express";
import User from "../models/User.js";
import Settings from "../models/Settings.js";

const router = express.Router();

router.get("/welcome", async (req, res) => {
  const { id } = req;

  try {
    if (!id) {
      res.status(401).json({
        message: "Invalid token",
      });
    } else {
      const userData = await Settings.findById(id);

      // send user data
      res.status(200).json({
        username: userData.username,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
});

router.get("/form", async (req, res) => {
  const { id } = req;

  try {
    if (!id) {
      res.status(401).json({
        message: "Invalid token",
      });
    } else {
      const userData = await Settings.findById(id);

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

router.patch("/email", async (req, res) => {
  const { id } = req;
  const { newEmail } = req.body;

  if (!id) {
    res.status(401).json({
      message: "Invalid token",
    });
  } else {
    // Verify data is unique
    const isEmailTaken = await Settings.isEmailTaken(newEmail);

    if (isEmailTaken) {
      return res.status(400).json({
        message: "Email already in use",
        data: isEmailTaken,
      });
    } else {
      const updatedEmail = await Settings.editEmail(id, newEmail);
      console.log(updatedEmail);

      res.status(200).json({
        message: `User was updated successfully, id: ${id} from request should be the same, id from response: ${updatedEmail.id}`,
        id: updatedEmail.id,
        email: updatedEmail.email,
      });
    }
  }
});

export default router;
