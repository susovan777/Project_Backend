import express from "express";
import { studentRouter } from "./Routes/routes.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config({ path: "./.env" });

// --- DATABASE CONNECTION (Moved from server.js) ---
const db = process.env.ATLAS_URI;

// Check if mongoose is already connected to avoid multiple connections in development/testing
mongoose
  .connect(db)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection failed:", err));

  // MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  const html = "<h1 style='text-align:center'>👋 Hello from Server!</h1>";
  res.send(html);
});

app.use("/api/v1/students", studentRouter);
export { app };
