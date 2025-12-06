import { TIMEZONES } from '../../utils/timezones';
import EventCard from '../EventCard/EventCard';
import styles from './EventList.module.css';
import useAppStore from '../../store/useAppStore';
import { useEffect } from 'react';

function EventList({ onEditEvent, onViewLogs }) {
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

  // console.log(events);

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
            <svg
              className={styles.emptyIcon}
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M53.3333 10.6667H10.6667C8.45753 10.6667 6.66667 12.4575 6.66667 14.6667V53.3333C6.66667 55.5425 8.45753 57.3333 10.6667 57.3333H53.3333C55.5425 57.3333 57.3333 55.5425 57.3333 53.3333V14.6667C57.3333 12.4575 55.5425 10.6667 53.3333 10.6667Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M42.6667 5.33334V16M21.3333 5.33334V16M6.66667 26.6667H57.3333"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className={styles.emptyTitle}>No events found</h3>
            <p className={styles.emptyDescription}>
              {currentProfile
                ? `No events assigned to ${currentProfile.name}. Create one using the form on the left.`
                : 'Select a profile from the dropdown above to view events, or create a new event using the form on the left.'}
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;
