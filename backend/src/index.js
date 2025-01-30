"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const users_1 = __importDefault(require("./routes/users"));
const friends_1 = __importDefault(require("./routes/friends"));
const friendRequests_1 = __importDefault(require("./routes/friendRequests"));
dotenv_1.default.config();
(0, db_1.default)(); // Connect to MongoDB
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
// Routes
app.use("/users", users_1.default);
app.use("/friends", friends_1.default);
app.use("/friendRequests", friendRequests_1.default);
app.get("/", (req, res) => {
    res.send("Friend Management System API is running...");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
