import express from 'express';
import { createTask, getAllTasks } from '../Controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.route('/').get(getAllTasks).post(createTask);

export default taskRouter;
