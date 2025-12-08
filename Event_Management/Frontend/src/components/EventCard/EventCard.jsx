import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import styles from './EventCard.module.css';
import { IoMdTime } from 'react-icons/io';
import { GoCalendar } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit, FiFileText, FiUser, FiUsers } from 'react-icons/fi';

dayjs.extend(utc);
dayjs.extend(timezone);

function EventCard({ event, currentTimezone, onEdit, onViewLogs, onDelete }) {
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
    return event.profiles.map((p) => p.name).join(', ');
  };

  return (
    <div className={styles.card}>
      {/* Header with Title and Profiles */}
      <div className={styles.header}>
        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.profiles}>
          {event.profiles.length > 1 ? <FiUsers /> : <FiUser />}
          <span className={styles.profileNames}>{getProfileNames()}</span>
        </div>
      </div>

      {/* Event Times */}
      <div className={styles.timeSection}>
        {/* Start Time */}
        <div className={styles.timeBlock}>
          <div className={styles.timeLabel}>
            <GoCalendar size={14} />
            <span className={styles.date}>
              Start: {formatDate(event.startDateTime)}
            </span>
          </div>
          <div className={styles.timeContent}>
            <div className={styles.time}>
              <IoMdTime size={16} /> {formatTime(event.startDateTime)}
            </div>
          </div>
        </div>

        {/* End Time */}
        <div className={styles.timeBlock}>
          <div className={styles.timeLabel}>
            <GoCalendar size={14} />
            <span className={styles.date}>
              End: {formatDate(event.endDateTime)}
            </span>
          </div>
          <div className={styles.timeContent}>
            <div className={styles.time}>
              <IoMdTime size={16} /> {formatTime(event.endDateTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className={styles.timestamps}>
        <p className={styles.timestamp}>
          Created: {formatTimestamp(event.createdAt)}
        </p>
        <p className={styles.timestamp}>
          Updated: {formatTimestamp(event.updatedAt)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={() => onEdit(event)}>
          <FiEdit size={16} />
          Edit
        </button>

        <button className={styles.logsButton} onClick={() => onViewLogs(event)}>
          <FiFileText size={16} />
          View Logs
        </button>

        <button
          className={styles.deleteButton}
          onClick={() => onDelete(event._id)}
        >
          <RiDeleteBin6Line size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;
