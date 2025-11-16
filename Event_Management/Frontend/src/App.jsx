import './App.css';
import ProfilePicker from './components/ProfilePicker';

const App = () => {
  return (
    <div className="app-container">
      <ProfilePicker />

      <div className="main-header">
        <h1>Event Management</h1>
        <p>Create and manage events across multiple timezones</p>
      </div>
      <div className="main-grid">
        <div className="left-panel">
          <div className="modal-header">
            <h2>Create Event</h2>
          </div>
        </div>

        <div className="right-panel">
          <div className="modal-header">
            <h2>Events</h2>
          </div>
          <p>View in Timezone</p>
        </div>
      </div>
    </div>
  );
};

export default App;
