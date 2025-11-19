import express from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../Controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.route('/').get(getAllTasks).post(createTask);
taskRouter.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export default taskRouter;
