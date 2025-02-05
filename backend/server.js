import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

// Initialize the app
const app = express();

// Ensure MongoDB URI is available
if (!process.env.MONGO_DB_URI) {
  console.error("MONGO_DB_URI is not defined in the .env file");
  process.exit(1);
}

// Middleware to parse incoming requests
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// No need to serve static files since the frontend is deployed separately on Vercel
// (We are no longer serving the frontend here)

// Export the app as a serverless function for Vercel
export default app;
