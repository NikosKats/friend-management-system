import { Router, Request, Response } from "express";
import User from "../models/User";
import { Types } from "mongoose";

const router = Router();

// Get a simple message indicating the Friend  API is running
router.get("/", (req: Request, res: Response) => {
  res.send("Friend API is running...");
});


/**
 * @route GET /friends/list/:userId
 * @desc Get a user's friends list
 */
router.get("/list/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).populate("friends", "username email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user.friends);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route DELETE /friends/remove
 * @desc Remove a friend from the list
 */
router.delete("/remove", async (req, res) => {
  const { userId, friendId } = req.body;

  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ error: "Not friends" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    return res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
