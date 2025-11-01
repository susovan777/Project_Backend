import express from "express";
import { studentRouter } from "./Routes/routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/students", studentRouter);
export { app };
