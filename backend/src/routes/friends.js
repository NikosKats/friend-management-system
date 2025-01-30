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
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = require("mongoose");
const router = (0, express_1.Router)();
// Get a simple message indicating the Friend  API is running
router.get("/", (req, res) => {
    res.send("Friend API is running...");
});
/**
 * @route GET /friends/list/:userId
 * @desc Get a user's friends list
 */
router.get("/list/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
        const user = yield User_1.default.findById(userId).populate("friends", "username email");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user.friends);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
/**
 * @route DELETE /friends/remove
 * @desc Remove a friend from the list
 */
router.delete("/remove", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
        const user = yield User_1.default.findById(userId);
        const friend = yield User_1.default.findById(friendId);
        if (!user || !friend) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.friends.includes(friendId)) {
            return res.status(400).json({ error: "Not friends" });
        }
        yield User_1.default.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
        yield User_1.default.findByIdAndUpdate(friendId, { $pull: { friends: userId } });
        return res.status(200).json({ message: "Friend removed successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
