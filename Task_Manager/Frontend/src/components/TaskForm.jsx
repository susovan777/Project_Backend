import axios from 'axios';
import { useState } from 'react';
import config from '../config/endpoint';

const URL = `${config.endpoint}/api/tasks`;

const TaskForm = ({ onTaskCreated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To-do',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(URL, formData);

      //   Notify the parent comp (TaskList) to refresh
      onTaskCreated(response.data.data);
      console.log(response.data.data);

      setFormData({
        title: '',
        description: '',
        status: 'To-do',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="form-label">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-input"
        required
      />

      <label className="form-label">Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-input"
        required
      />
      <label className="form-label">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="form-input"
        required
      >
        <option value="To-do">To-do</option>
        <option value="In-progress">In-progress</option>
        <option value="Done">Done</option>
      </select>

      <button
        type="submit"
        className="form-button"
        style={{ backgroundColor: '#6c63ff', marginTop: '20px' }}
      >
        {loading ? 'Adding...' : '+ Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
