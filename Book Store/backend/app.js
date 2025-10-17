import express from "express";
import { bookRouter } from "./routes/bookRoute.js";

const app = express();
app.use(express.json());

app.use("/api/v1/books", bookRouter);

export { app };

/* 
app.get("/api/v1/books", getAllBooks);
app.post("/api/v1/books", addNewBook);

app.get("/api/v1/books/:id", getBook);
app.patch("/api/v1/books/:id", updateBook);
app.delete("/api/v1/books/:id", deleteBook);
 */
