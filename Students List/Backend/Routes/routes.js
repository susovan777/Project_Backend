import express from "express";

import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getStudent,
  updateStudent,
} from "../Controller/rootController.js";

const studentRouter = express.Router();

studentRouter.route("/").get(getAllStudent).post(createStudent);
studentRouter
  .route("/:id")
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

export { studentRouter };
