import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Friend Management System API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
