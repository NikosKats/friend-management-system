"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: {
        sent: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "FriendRequest" }], // Reference FriendRequest
        received: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "FriendRequest" }] // Reference FriendRequest
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
