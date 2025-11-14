import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to the Event Management System!");
});

export { app };
