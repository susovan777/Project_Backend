import axios from 'axios';
import { useEffect, useState } from 'react';
import TaskList from './TaskList';

const DisplayTask = () => {
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

  console.log(tasks);
  return (
    <div className="display-tasks">
      {tasks.length === 0 ? <p>No events found</p> : <TaskList tasks={tasks} />}
    </div>
  );
};

export default DisplayTask;
