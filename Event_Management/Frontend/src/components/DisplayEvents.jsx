import useAppStore from '../store/useAppStore';
import eventServices from '../services/eventServices';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';


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

  const currentViewTimezone = 'IST'

  return (
    <div className="display-events">
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {events.map((event) => (
            <li key={event._id} className="event-card">
              <p>
                <strong>{event.title}</strong> (Created in:{' '}
                {event.eventTimezone})
              </p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Assigned: {event.profiles.map((p) => p.name).join(', ')}
              </p>
              {/* Time Display based on currentViewTimezone */}
              <div style={{ marginTop: '10px' }}>
                <p className="time-label">Start Time:</p>
                <TimeDisplay
                  utcDateString={event.startDateTime}
                  targetTimezone={currentViewTimezone}
                />
              </div>
              <div style={{ marginTop: '5px' }}>
                <p className="time-label">End Time:</p>
                <TimeDisplay
                  utcDateString={event.endDateTime}
                  targetTimezone={currentViewTimezone}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayEvents;
