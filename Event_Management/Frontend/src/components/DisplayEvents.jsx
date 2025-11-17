import useAppStore from '../store/useAppStore';
import eventServices from '../services/eventServices';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { LuUserRound, LuUsers } from 'react-icons/lu';
import { CiCalendar } from 'react-icons/ci';
import { FaEdit } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';

const TimeDisplay = ({ utcDateString, targetTimezone }) => {
  const utcMoment = moment.utc(utcDateString);
  // convert the timezone
  const localMoment = utcMoment.tz(targetTimezone);

  return localMoment.format('YYYY-MM-DD HH:mm:ss z');
};

const DisplayEvents = () => {
  const events = useAppStore((state) => state.events);
  const setEvents = useAppStore((state) => state.setEvents);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventServices.getAllEvents();
        setEvents(data.events);
      } catch (error) {
        setError('Failed to fetch events.');
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const currentViewTimezone = 'IST';

  return (
    <div className="display-events">
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {events.map((event) => (
            <li key={event._id} className="event-card">
              <p>
                <strong>{event.title}</strong>
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                {event.profiles.length > 1 ? <LuUsers /> : <LuUserRound />}{' '}
                {event.profiles.map((p) => p.name).join(', ')}
              </p>
              {/* Time Display based on currentViewTimezone */}
              <div style={{ marginTop: '10px' }}>
                <p className="time-label">
                  <CiCalendar /> Start:{' '}
                  <TimeDisplay
                    utcDateString={event.startDateTime}
                    targetTimezone={currentViewTimezone}
                  />
                </p>
              </div>
              <div style={{ marginTop: '5px' }}>
                <p className="time-label">
                  <CiCalendar /> End:{' '}
                  <TimeDisplay
                    utcDateString={event.endDateTime}
                    targetTimezone={currentViewTimezone}
                  />
                </p>
              </div>

              <hr className="event-card-divider" />

              {/* Created/Updated Timestamps */}
              <div className="event-timestamps">
                <p>Created: 2026-01-10 10:00:00</p>
                <p>Updated: 2025-01-10 10:00:00</p>
              </div>

              <hr className="event-card-divider" />

              {/* Edit and View Logs Buttons */}
              <div className="event-action-buttons">
                <button className="action-button edit-button">
                  <FaEdit /> Edit
                </button>
                <button className="action-button logs-button">
                  <FaFileAlt /> View Logs
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayEvents;
