import express from "express";
import { studentRouter } from "./Routes/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/students", studentRouter);
export { app };
