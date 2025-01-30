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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Import bcryptjs
const User_1 = __importDefault(require("../models/User")); // Import the User model
// Register User Method
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    try {
        // Check if the user already exists (by username or email)
        const existingUser = yield User_1.default.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        // Hash the password before saving to the database
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create a new user
        const newUser = new User_1.default({ username, email, password: hashedPassword });
        // Save the user to the database
        yield newUser.save();
        // Generate a JWT token for the new user
        const payload = { userId: newUser._id }; // You can add more data if needed
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });
        // Send back the JWT token
        return res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.register = register;
// Login User Method
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        // Find user by email
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Compare the plain password with the hashed password stored in the database
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Generate a JWT token
        const payload = { userId: user._id }; // You can add more data if needed
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });
        // Send back the JWT token
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.login = login;
