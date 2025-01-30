import { Router, Request, Response } from "express";
import User from "../models/User";
import { randomBytes, pbkdf2Sync } from "crypto";
import { Types } from "mongoose";

const router = Router();

// Get a simple message indicating the User API is running
router.get("/", (req: Request, res: Response) => {
  res.send("User API is running...");
});

// Get all users
router.get("/all", async (req: Request, res: Response) => {
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
 * @route POST /users/create
 * @desc Create a new user
 */
router.post("/create", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Hash the password using crypto
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Create and save the user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "User created successfully", userId: user._id });
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
