import { Router, Request, Response } from "express";
import FriendRequest from "../models/FriendRequest";
import User from "../models/User";
import { Types } from "mongoose";
import { Server } from "socket.io";

const router = Router();
let io: Server; // Declare io to use in the route

// Assign io in the main server setup file
export const setSocketIO = (socketIO: Server) => {
  io = socketIO;
};

// API status check
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
    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId)
    ]);

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    const existingRequest = await FriendRequest.findOne({ senderId, receiverId, status: "pending" });
    if (existingRequest) return res.status(400).json({ error: "Friend request already sent" });

    const friendRequest = new FriendRequest({
      senderId,
      senderUsername: sender.username,
      senderEmail: sender.email,
      receiverId,
      receiverUsername: receiver.username,
      receiverEmail: receiver.email
    });

    await friendRequest.save();

    await Promise.all([
      User.findByIdAndUpdate(senderId, { $push: { "friendRequests.sent": friendRequest._id } }),
      User.findByIdAndUpdate(receiverId, { $push: { "friendRequests.received": friendRequest._id } })
    ]);

    io.emit("friend-request-sent", {
      senderId,
      receiverId,
      message: `${sender.username} has sent you a friend request!`
    });

    return res.status(201).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("❌ Error while sending friend request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route POST /friend-requests/respond
 * @desc Accept or decline a friend request
 */
router.post("/respond", async (req, res) => {
  const { requestId, status } = req.body;

  if (!Types.ObjectId.isValid(requestId) || !["accepted", "declined"].includes(status)) {
    return res.status(400).json({ error: "Invalid request ID or status" });
  }

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ error: "Invalid or already processed request" });
    }

    request.status = status;
    await request.save();

    if (status === "accepted") {
      await Promise.all([
        User.findByIdAndUpdate(request.senderId, { $push: { friends: request.receiverId } }),
        User.findByIdAndUpdate(request.receiverId, { $push: { friends: request.senderId } })
      ]);
    }

    io.emit("friend-request-responded", {
      senderId: request.senderId,
      receiverId: request.receiverId,
      status,
      message: `Your friend request was ${status}`
    });

    return res.status(200).json({ message: `Friend request ${status}` });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route GET /friend-requests/pending/:userId
 * @desc Get pending friend requests for a user
 */
router.get("/received/pending/:userId", async (req, res) => {
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

/**
 * @route GET /friend-requests/sent/pending/:userId
 * @desc Get pending friend requests sent by a user
 */
router.get("/sent/pending/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const requests = await FriendRequest.find({ senderId: userId, status: "pending" }).populate("receiverId", "username email");
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

 
/**
 * @route DELETE /friend-requests/delete-all/:userId
 * @desc Delete all pending friend requests for a user
 */
router.delete("/delete-all/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Find all pending friend requests where the user is either the sender or the receiver
    const pendingRequests = await FriendRequest.find({
      $or: [
        { senderId: userId, status: "pending" },
        { receiverId: userId, status: "pending" }
      ]
    });

    // If no pending requests are found
    if (pendingRequests.length === 0) {
      return res.status(404).json({ error: "No pending friend requests found" });
    }

    // Delete the pending requests
    await FriendRequest.deleteMany({
      _id: { $in: pendingRequests.map((request) => request._id) }
    });

    // Also update the User model by removing the requests from the sent and received arrays
    await Promise.all([
      User.findByIdAndUpdate(userId, { $pull: { "friendRequests.sent": { $in: pendingRequests.map((req) => req._id) } } }),
      User.findByIdAndUpdate(userId, { $pull: { "friendRequests.received": { $in: pendingRequests.map((req) => req._id) } } })
    ]);

    return res.status(200).json({ message: "All pending friend requests deleted" });
  } catch (error) {
    console.error("❌ Error while deleting all pending friend requests:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
