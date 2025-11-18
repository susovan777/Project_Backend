import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: false,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: ['To-do', 'In-progress', 'Done'], // Only these values are allowed
      default: 'To-do', // default status for new tasks
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
