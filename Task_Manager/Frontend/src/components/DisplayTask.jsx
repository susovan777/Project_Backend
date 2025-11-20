import TaskItem from './TaskItem';

const DisplayTask = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No task found</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayTask;
