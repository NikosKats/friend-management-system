"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSocketIO = void 0;
const express_1 = require("express");
const FriendRequest_1 = __importDefault(require("../models/FriendRequest"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = require("mongoose");
const router = (0, express_1.Router)();
let io; // Declare io to use in the route
// Assign io in the main server setup file
const setSocketIO = (socketIO) => {
    io = socketIO;
};
exports.setSocketIO = setSocketIO;
// API status check
router.get("/", (req, res) => {
    res.send("Friend Requests API is running...");
});
/**
 * @route POST /friend-requests/send
 * @desc Send a friend request
 */
router.post("/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(senderId) || !mongoose_1.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    if (senderId === receiverId) {
        return res.status(400).json({ error: "You cannot send a friend request to yourself" });
    }
    try {
        const [sender, receiver] = yield Promise.all([
            User_1.default.findById(senderId),
            User_1.default.findById(receiverId)
        ]);
        if (!sender || !receiver) {
            return res.status(404).json({ error: "Sender or receiver not found" });
        }
        const existingRequest = yield FriendRequest_1.default.findOne({ senderId, receiverId, status: "pending" });
        if (existingRequest)
            return res.status(400).json({ error: "Friend request already sent" });
        const friendRequest = new FriendRequest_1.default({
            senderId,
            senderUsername: sender.username,
            senderEmail: sender.email,
            receiverId,
            receiverUsername: receiver.username,
            receiverEmail: receiver.email
        });
        yield friendRequest.save();
        yield Promise.all([
            User_1.default.findByIdAndUpdate(senderId, { $push: { "friendRequests.sent": friendRequest._id } }),
            User_1.default.findByIdAndUpdate(receiverId, { $push: { "friendRequests.received": friendRequest._id } })
        ]);
        io.emit("friend-request-sent", {
            senderId,
            receiverId,
            message: `${sender.username} has sent you a friend request!`
        });
        return res.status(201).json({ message: "Friend request sent successfully" });
    }
    catch (error) {
        console.error("❌ Error while sending friend request:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
/**
 * @route POST /friend-requests/respond
 * @desc Accept or decline a friend request
 */
router.post("/respond", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId, status } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(requestId) || !["accepted", "declined"].includes(status)) {
        return res.status(400).json({ error: "Invalid request ID or status" });
    }
    try {
        const request = yield FriendRequest_1.default.findById(requestId);
        if (!request || request.status !== "pending") {
            return res.status(400).json({ error: "Invalid or already processed request" });
        }
        request.status = status;
        yield request.save();
        if (status === "accepted") {
            yield Promise.all([
                User_1.default.findByIdAndUpdate(request.senderId, { $push: { friends: request.receiverId } }),
                User_1.default.findByIdAndUpdate(request.receiverId, { $push: { friends: request.senderId } })
            ]);
        }
        io.emit("friend-request-responded", {
            senderId: request.senderId,
            receiverId: request.receiverId,
            status,
            message: `Your friend request was ${status}`
        });
        return res.status(200).json({ message: `Friend request ${status}` });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
/**
 * @route GET /friend-requests/pending/:userId
 * @desc Get pending friend requests for a user
 */
router.get("/pending/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
        const requests = yield FriendRequest_1.default.find({ receiverId: userId, status: "pending" }).populate("senderId", "username email");
        return res.status(200).json(requests);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
