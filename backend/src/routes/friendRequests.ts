import { Router, Request, Response } from "express";
import FriendRequest from "../models/FriendRequest";
import User from "../models/User";
import { Types } from "mongoose";

const router = Router();


// Get a simple message indicating the Friend Requests API is running
router.get("/", (req: Request, res: Response) => {
  res.send("Friend Requests API is running...");
});

/**
 * @route POST /friend-requests/send
 * @desc Send a friend request
 */
router.post("/send", async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!Types.ObjectId.isValid(senderId) || !Types.ObjectId.isValid(receiverId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  if (senderId === receiverId) {
    return res.status(400).json({ error: "You cannot send a friend request to yourself" });
  }

  try {
    // Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ error: "User not found" });

    // Check if a request already exists
    const existingRequest = await FriendRequest.findOne({ senderId, receiverId, status: "pending" });
    if (existingRequest) return res.status(400).json({ error: "Friend request already sent" });

    // Create and save the request
    const friendRequest = new FriendRequest({ senderId, receiverId });
    await friendRequest.save();

    return res.status(201).json({ message: "Friend request sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route POST /friend-requests/respond
 * @desc Accept or decline a friend request
 */
router.post("/respond", async (req, res) => {
  const { requestId, status } = req.body;

  if (!Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({ error: "Invalid request ID" });
  }

  if (!["accepted", "declined"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: "Friend request not found" });

    if (request.status !== "pending") {
      return res.status(400).json({ error: "Friend request already processed" });
    }

    request.status = status;
    await request.save();

    if (status === "accepted") {
      await User.findByIdAndUpdate(request.senderId, { $push: { friends: request.receiverId } });
      await User.findByIdAndUpdate(request.receiverId, { $push: { friends: request.senderId } });
    }

    return res.status(200).json({ message: `Friend request ${status}` });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route GET /friend-requests/pending/:userId
 * @desc Get pending friend requests for a user
 */
router.get("/pending/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const requests = await FriendRequest.find({ receiverId: userId, status: "pending" }).populate("senderId", "username email");
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
