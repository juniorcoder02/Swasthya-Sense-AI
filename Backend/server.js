import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/user.js";

// load environment variables
dotenv.config();

const app = express();

// connect to database
connectDB();
// Middlewares
app.use(cors()); //for cross origin networks
app.use(express.json()); // for parsing JSON request bodies

// sample route
app.get("/", (req, res) => {
  res.send("Swasthya-Sense AI Backend running");
});

// Routes
app.use("/api/auth", authRoutes);
// user routes
app.use("/api/user", userRoutes);



// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
