import express from "express";
import { studentRouter } from "./Routes/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const html = "<h1 style='text-align:center'>👋 Hello from Server!</h1>";
  res.send(html);
});
app.use("/api/v1/students", studentRouter);
export { app };
