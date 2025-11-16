import { useState } from 'react';
import useAppStore from '../store/useAppStore';
import moment from 'moment-timezone';

const timezones = moment.tz.names();

const CreateEvent = () => {
  const profiles = useAppStore((state) => state.profiles);
  const [formData, setFormData] = useState({
    title: '',
    profiles: [],
    eventTimezone: 'IST',
    startDateTime: '',
    endDateTime: '',
  });

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="form-container">
      {/* Profiles */}
      <label className="form-label">Profiles</label>
      <select
        name="profiles"
        multiple={true}
        value={formData.profiles}
        onChange={handleChange}
        className="form-select-multi"
        required
      >
        {/* {profiles.length > 0 ? (
          profiles.map((p) => {
            return (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            );
          })
        ) : (
          <option>Select profiles...</option>
          )} */}
        <option>Select profiles...</option>
      </select>

      {/* Timezone */}
      <label className="form-label">Timezone</label>
      <select
        name="eventTimezone"
        value={formData.eventTimezone}
        onChange={handleChange}
        required
        className="form-select-single"
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>

      {/* Start Date & Time */}
      <label className="form-label">Start Date & Time</label>
      <div className="date-time-group">
        <input
          type="datetime-local"
          name="startDateTime"
          value={formData.startDateTime}
          onChange={handleChange}
          required
          className="date-time-input"
        />
      </div>

      {/* End Date & Time */}
      <label className="form-label">End Date & Time</label>
      <div className="date-time-group">
        <input
          type="datetime-local"
          name="endDateTime"
          value={formData.endDateTime}
          onChange={handleChange}
          required
          className="date-time-input"
        />
      </div>

      <button
        type="submit"
        className="form-button"
        style={{ backgroundColor: '#6c63ff', marginTop: '20px' }}
      >
        + Create Event
      </button>
    </form>
  );
};

export default CreateEvent;
