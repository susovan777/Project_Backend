import './App.css';
import { useEffect, useState } from 'react';
import useAppStore from './store/useAppStore';
import CreateEvent from './components/CreateEvent';
import DisplayEvents from './components/DisplayEvents';
import ProfilePicker from './components/ProfilePicker';
import profileServices from './services/profileServices';

const App = () => {
  const profiles = useAppStore((state) => state.profiles);
  const addProfile = useAppStore((state) => state.addProfile);
  const setProfiles = useAppStore((state) => state.setProfiles);
  // Track the profile
  const [currentProfileId, setCurrentProfileId] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      const data = await profileServices.getAllProfiles();
      setProfiles(data.profiles);
    };

    getProfiles();
  }, [setProfiles]);

  // console.log(profiles);

  return (
    <div className="app-container">
      <ProfilePicker
        profiles={profiles}
        addProfile={addProfile}
        currentProfileId={currentProfileId}
        setCurrentProfileId={setCurrentProfileId}
      />

      <div className="main-header">
        <h1>Event Management</h1>
        <p>Create and manage events across multiple timezones</p>
      </div>
      <div className="main-grid">
        <div className="left-panel">
          <div className="modal-header">
            <h2>Create Event</h2>
          </div>
          <CreateEvent />
        </div>

        <div className="right-panel">
          <div className="modal-header">
            <h2>Events</h2>
          </div>
          <label className="form-label">View in Timezone</label>
          <select
            name="eventTimezone"
            // value={formData.eventTimezone}
            // onChange={handleChange}
            required
            className="form-select-single"
          >
            {/* {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))} */}
          </select>
          <DisplayEvents />
        </div>
      </div>
    </div>
  );
};

export default App;
