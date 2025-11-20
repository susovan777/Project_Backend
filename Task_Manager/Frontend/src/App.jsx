import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayTask from './components/DisplayTask';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        // console.log(response.data);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch task from backend');
      }
    };

    getTasks();
  }, []);

  const handleAddedTask = (newTask) => {
    setTasks((prev) => ({
      newTask,
      ...prev,
    }));
  };

  const handleEdit = (id) => {
    console.log(`Editing task ${id}`);
    
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tasks/:${id}`);
      setTasks((task) => task._id !== id);
      console.log(`Task with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    console.log(`Change status for task ${id} to ${newStatus}`);
  };

  // console.log(tasks);

  return (
    <div className="app-container">
      <div className="main-header">
        <h1>Task Manager</h1>
        <p>Create and manage task very easily</p>
      </div>

      <div className="main-grid">
        <div className="left-panel">
          <div className="modal-header">
            <h2>Create Task</h2>
          </div>
          <hr className="task-card-divider" />
          <TaskForm onTaskCreated={handleAddedTask} />
        </div>

        <div className="right-panel">
          <div className="modal-header">
            <h2>My Tasks</h2>
          </div>
          <hr className="task-card-divider" />
          <DisplayTask
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleChangeStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
