import { useState } from 'react';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To-do',
  });

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
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
        name="title"
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
        + Create Task
      </button>
    </div>
  );
};

export default TaskForm;
