import { useEffect } from 'react';
import styles from './EventList.module.css';
import { CiCalendar } from 'react-icons/ci';
import EventCard from '../EventCard/EventCard';
import { TIMEZONES } from '../../utils/timezones';
import useAppStore from '../../store/useAppStore';

function EventList({ onEditEvent, onViewLogs, onDelete }) {
  const {
    events,
    currentProfile,
    currentTimezone,
    setCurrentTimezone,
    getEventsByProfile,
    getAllEvents,
    loading,
  } = useAppStore();

  // Fetch events based on profile selection
  useEffect(() => {
    if (currentProfile) {
      getEventsByProfile(currentProfile._id);
    }
    // If no profile selected then fetch all events
    else {
      getAllEvents();
    }
  }, [currentProfile, getEventsByProfile, getAllEvents]);

  // console.log(currentTimezone);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Events</h2>

        {/* Timezone Selector */}
        <div className={styles.timezoneSection}>
          <label className={styles.timezoneLabel}>View in Timezone</label>
          <select
            value={currentTimezone}
            onChange={(e) => setCurrentTimezone(e.target.value)}
            className={styles.timezoneSelect}
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className={styles.eventsList}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className={styles.emptyState}>
            <CiCalendar className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No events found</h3>
            <p className={styles.emptyDescription}>
              {currentProfile
                ? `No events assigned to ${currentProfile.name}. Create one using the form.`
                : 'Create a new event using the form.'}
            </p>
          </div>
        ) : (
          <div className={styles.eventsGrid}>
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                currentTimezone={currentTimezone}
                onEdit={onEditEvent}
                onViewLogs={onViewLogs}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;
