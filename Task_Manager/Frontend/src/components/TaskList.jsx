import { FaEdit, FaFileAlt } from 'react-icons/fa';

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No task found</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((t) => {
            return (
              <li key={t._id} className="task-card">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <small>Status: {t.status}</small>

                <hr className="task-card-divider" />

                {/* Edit and View Logs Buttons */}
                <div className="task-action-buttons">
                  <button className="action-button edit-button">
                    <FaEdit /> Edit
                  </button>
                  <button className="action-button logs-button">
                    <FaFileAlt /> View Logs
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
