import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app } from "./socket/socket.js"; // No need for server anymore

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_DB_URI) {
  console.error("MONGO_DB_URI is not defined in the .env file");
  process.exit(1);
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Export the app as a serverless function for Vercel
export default app;
