import { FaEdit, FaFileAlt } from 'react-icons/fa';

const TaskItem = ({ task, onStatusChange, onEdit, onDelete }) => {
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'To Do':
        return 'In Progress';
      case 'In Progress':
        return 'Done';
      case 'Done':
        return 'To Do'; // Cycle back to 'To Do'
      default:
        return 'To Do';
    }
  };

  // Text for the status change button
  const nextStatus = getNextStatus(task.status);
  const statusButtonText = `Set to: ${nextStatus}`;

  return (
    <li className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Status: {task.status}</small>

      <div className="task-actions">
        {/* Button to change the status, calling the prop function */}
        <button
          className="status-btn"
          onClick={() => onStatusChange(task._id, nextStatus)}
        >
          {statusButtonText}
        </button>

        {/* Button to edit the task, calling the prop function */}
        <button className="edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>

        {/* Button to delete the task, calling the prop function */}
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>

      {/* <hr className="task-card-divider" />

                <div className="task-action-buttons">
                  <button className="action-button edit-button">
                    <FaEdit /> Edit
                  </button>
                  <button className="action-button logs-button">
                    <FaFileAlt /> View Logs
                  </button>
                </div> */}
    </li>
  );
};

export default TaskItem;
