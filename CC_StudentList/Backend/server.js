import { app } from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const db = process.env.ATLAS_URI;

mongoose
  .connect(db)
  .then(() => console.log("Database connected successfully!"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend server started at port ${port}...`);
});
