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
const authMiddleware_1 = require("../middleware/authMiddleware"); // Import the middleware
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Get a simple message indicating the User API is running
router.get("/", (req, res) => {
    res.send("User API is running...");
});
router.get("/protected", authMiddleware_1.authMiddleware, (req, res) => {
    res.send("protected route is visible...");
});
router.post('/login', authController_1.login);
router.post('/register', authController_1.register);
// Get all users
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find(); // Fetch all users from the database
        return res.status(200).json(users); // Return the users
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
// Get a user by ID
router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
/**
 * @route DELETE /users/delete/:userId
 * @desc Delete a user by ID
 */
router.delete("/delete/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
        const user = yield User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
