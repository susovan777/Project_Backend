import Task from '../Models/Task.js';

// --- CREATE a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Simple validation
    if (!title) {
      return res.status(400).json({
        status: 'Fail',
        message: 'Title is required to create a task',
      });
    }

    // create a task
    const task = await Task.create({
      title,
      description,
      status,
    });

    // respond with 201 status
    res.status(201).json({
      status: 'Success',
      messege: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    // handle validation error
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    }

    // handle server errors
    console.error(error);
    res.status(500).json({
      messege: 'Server error: Could not create task',
    });
  }
};

// --- GET all the tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: 'Success',
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      messege: 'Server error: Could not retrieve tasks',
    });
  }
};

// --- GET a single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      task,
    });
  } catch (error) {
    // handle invalid MongoDB Id
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'Fail',
        message: 'Invalid Task ID format',
      });
    }

    console.error(error);
    res.status(500).json({
      messege: 'Server error: Could not retrieve task',
    });
  }
};

// --- UPDATE a task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Success',
      messege: 'Task updated successfully',
      updatedTask,
    });
  } catch (error) {
    console.error(error);
    
    // handle Invlid Mongo ID
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'Fail',
        message: 'Invalid Task ID format',
      });
    }

    // handle validation error
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    }


    
    res.status(500).json({
      messege: 'Server error: Could not update task',
    });
  }
};

// --- DELETE a task
const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete(req.params.id);

    res.status(200).json({
      status: 'Success',
      messege: 'Task deleted successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'Fail',
        message: 'Invalid Task ID format',
      });
    }

    console.error(error);
    res.status(500).json({
      messege: 'Server error: Could not delete task',
    });
  }
};

export { createTask, getAllTasks, getTask, updateTask, deleteTask };
