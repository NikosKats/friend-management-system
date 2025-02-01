import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import userRoutes from "./routes/users";
import friendRoutes from "./routes/friends";
import friendRequests, { setSocketIO } from "./routes/friendRequests"; // Import setSocketIO function
import cors from "cors";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 8080;

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend connections
    methods: ["GET", "POST"],
  },
});

// Assign io to friendRequests route
setSocketIO(io);

app.use(express.json());

// Allow requests from the frontend app on localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

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
app.use("/users", userRoutes);
app.use("/friends", friendRoutes);
app.use("/friendRequests", friendRequests);

app.get("/", (req, res) => {
  res.send("Friend Management System API is running...");
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
