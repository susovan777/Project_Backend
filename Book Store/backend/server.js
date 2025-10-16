import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config({ path: "./.env" });

const db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(db)
  .then(() => console.log("Database connected successfully!"));

const port = process.env.PORT;


app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.listen(port, () => {
  console.log("Server is listening at port", port);
});
