import { Router, Request, Response } from "express";
import User from "../models/User";
import { randomBytes, pbkdf2Sync } from "crypto";
import { Types } from "mongoose";
import { authMiddleware } from "../middleware/authMiddleware";  // Import the middleware
import { logout, login, register } from '../controllers/authController';

const router = Router();

// Get a simple message indicating the User API is running
router.get("/", (req: Request, res: Response) => {
  res.send("User API is running...");
});

router.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.send("protected route is visible...");
});

router.post('/logout', logout);
router.post('/login', login);
router.post('/register', register);


// Get all users
router.get("/all", authMiddleware, async (req: Request, res: Response) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    return res.status(200).json(users); // Return the users
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get a user by ID
router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route DELETE /users/delete/:userId
 * @desc Delete a user by ID
 */
router.delete("/delete/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
