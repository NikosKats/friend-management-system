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
  console.log("🟢 New client connected:", socket.id);

  // Store users in memory (optional: replace with Redis for scalability)
  const users: Record<string, string> = {};

  socket.on("register", (userId) => {
    users[userId] = socket.id; // Map userId to socketId
    console.log(`👤 User registered: ${userId} -> ${socket.id}`);
  });

  // Handle friend request
  socket.on("send-friend-request", ({ senderId, receiverId }) => {
    console.log(`📩 Friend request from ${senderId} to ${receiverId}`);

    // Notify the sender (confirmation)
    socket.emit("friend-request-sent", { message: "Request Sent" });

    // Notify the receiver (if online)
    const receiverSocketId = users[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("friend-request-received", {
        senderId,
        message: "You have a new friend request!",
      });
      console.log(`🔔 Notification sent to ${receiverId}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
      }
    }
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
