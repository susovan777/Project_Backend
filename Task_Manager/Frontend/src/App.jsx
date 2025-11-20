import './App.css';
import DisplayTask from './components/DisplayTask';
import TaskForm from './components/TaskForm';

const App = () => {
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
          <TaskForm />
        </div>

        <div className="right-panel">
          <div className="modal-header">
            <h2>My Tasks</h2>
          </div>
          <hr className="task-card-divider" />
          <DisplayTask />
        </div>
      </div>
    </div>
  );
};

export default App;
