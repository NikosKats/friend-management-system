import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/users";
import friendRoutes from "./routes/friends";
import friendRequests from "./routes/friendRequests";
import cors from "cors";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Allow requests from the frontend app on localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',  
}));

// Routes
app.use("/users", userRoutes);
app.use("/friends", friendRoutes);
app.use("/friendRequests", friendRequests);

app.get("/", (req, res) => {
  res.send("Friend Management System API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
