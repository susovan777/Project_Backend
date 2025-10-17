import express from "express";
import {
  addNewBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controller/bookController.js";

const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooks).post(addNewBook);
bookRouter.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

export { bookRouter };
