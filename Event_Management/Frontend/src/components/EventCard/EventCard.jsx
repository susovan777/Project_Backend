import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import styles from './EventCard.module.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function EventCard({ event, currentTimezone, onEdit, onViewLogs }) {
  // Format dates in user's timezone
  const formatDate = (date) => {
    if (!date) return '';
    return dayjs(date).tz(currentTimezone).format('MMM D, YYYY'); // "Dec 1, 2025"
  };

  const formatTime = (date) => {
    if (!date) return '';
    return dayjs(date).tz(currentTimezone).format('h:mm A'); // "3:30 PM"
  };

  const formatTimestamp = (date) => {
    if (!date) return '';
    return dayjs(date).tz(currentTimezone).format('MMM D, YYYY [at] h:mm A'); // "Dec 1, 2025 at 3:30 PM"
  };

  // Get profile names
  const getProfileNames = () => {
    if (!event.profiles || event.profiles.length === 0) return '';
    // console.log(event.profile.length)
    return event.profiles.map((p) => p.name).join(', ');
  };

  return (
    <div className={styles.card}>
      {/* Header with Title and Profiles */}
      <div className={styles.header}>
        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.profiles}>
          <svg
            className={styles.profileIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 14C14 11.7909 11.3137 10 8 10C4.68629 10 2 11.7909 2 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.profileNames}>{getProfileNames()}</span>
        </div>
      </div>

      {/* Event Times */}
      <div className={styles.timeSection}>
        {/* Start Time */}
        <div className={styles.timeBlock}>
          <div className={styles.timeLabel}>
            <svg
              className={styles.timeIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 5V8L10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>Start: </span>
          </div>
          <div className={styles.timeContent}>
            <div className={styles.date}>{formatDate(event.startDateTime)}</div>
            <div className={styles.time}>{formatTime(event.startDateTime)}</div>
          </div>
        </div>

        {/* End Time */}
        <div className={styles.timeBlock}>
          <div className={styles.timeLabel}>
            <svg
              className={styles.timeIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 5V8L10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>End: </span>
          </div>
          <div className={styles.timeContent}>
            <div className={styles.date}>{formatDate(event.endDateTime)}</div>
            <div className={styles.time}>{formatTime(event.endDateTime)}</div>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className={styles.timestamps}>
        <div className={styles.timestamp}>
          <span className={styles.timestampLabel}>Created:</span>
          <span className={styles.timestampValue}>
            {formatTimestamp(event.createdAt)}
          </span>
        </div>
        <div className={styles.timestamp}>
          <span className={styles.timestampLabel}>Updated:</span>
          <span className={styles.timestampValue}>
            {formatTimestamp(event.updatedAt)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={() => onEdit(event)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M11.3333 2.00004C11.5084 1.82494 11.716 1.68605 11.9437 1.59129C12.1714 1.49653 12.4148 1.44775 12.6606 1.44775C12.9064 1.44775 13.1498 1.49653 13.3775 1.59129C13.6052 1.68605 13.8128 1.82494 13.9879 2.00004C14.163 2.17513 14.3019 2.38272 14.3967 2.61039C14.4914 2.83806 14.5402 3.08147 14.5402 3.32737C14.5402 3.57327 14.4914 3.81668 14.3967 4.04435C14.3019 4.27202 14.163 4.47961 13.9879 4.65471L5.06061 13.582L1.33334 14.6667L2.41818 10.9394L11.3333 2.00004Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Edit
        </button>

        <button className={styles.logsButton} onClick={() => onViewLogs(event)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M9.33333 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V6.66667M13 1L8 6M13 1H10M13 1V4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          View Logs
        </button>
      </div>
    </div>
  );
}

export default EventCard;
