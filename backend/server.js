import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// Load environment variables
dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() to access the env variables.
const PORT = process.env.PORT || 5000;

// Ensure MONGO_DB_URI is set in .env
if (!process.env.MONGO_DB_URI) {
	console.log(process.env.MONGO_DB_URI); // Debugging line

  console.error("MONGO_DB_URI is not defined in the .env file");
  process.exit(1);
}

app.use(express.json()); // to parse incoming JSON payloads from req.body
app.use(cookieParser());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Catch-all route for single-page applications (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
server.listen(PORT, () => {
  connectToMongoDB(); // Establish connection to MongoDB
  console.log(`Server Running on port ${PORT}`);
});
