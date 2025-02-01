"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const users_1 = __importDefault(require("./routes/users"));
const friends_1 = __importDefault(require("./routes/friends"));
const friendRequests_1 = __importStar(require("./routes/friendRequests")); // Import setSocketIO function
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, db_1.default)(); // Connect to MongoDB
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Create an HTTP server
const server = http_1.default.createServer(app);
// Initialize Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow frontend connections
        methods: ["GET", "POST"],
    },
});
// Assign io to friendRequests route
(0, friendRequests_1.setSocketIO)(io);
app.use(express_1.default.json());
// Allow requests from the frontend app on localhost:5173
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
// WebSocket connection handling
io.on("connection", (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);
    socket.on("send-friend-request", (data) => {
        console.log(`📩 Friend request event received:`, data);
        socket.emit("friend-request-sent", { message: "Request Sent" });
    });
    socket.on("disconnect", () => {
        console.log(`🔴 Client disconnected: ${socket.id}`);
    });
});
// Routes
app.use("/users", users_1.default);
app.use("/friends", friends_1.default);
app.use("/friendRequests", friendRequests_1.default);
app.get("/", (req, res) => {
    res.send("Friend Management System API is running...");
});
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
