import { useMemo } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import useAppStore from '../../store/useAppStore';
import styles from './UpdateHistory.module.css';
import { GrClose } from 'react-icons/gr';
import { GoHistory } from 'react-icons/go';
import { IoMdTime } from "react-icons/io";

dayjs.extend(utc);
dayjs.extend(timezone);

function UpdateHistoryModal({ event, onClose }) {
  const { currentTimezone, profiles } = useAppStore();

  // Format timestamp in user's current timezone
  const formatTimestamp = (date, tz) => {
    const timezoneToUse = tz || currentTimezone;
    return dayjs(date).tz(timezoneToUse).format('MMM D, YYYY [at] h:mm A');
  };

  // Format date value for display
  const formatDateValue = (date, tz) => {
    if (!date) return 'N/A';
    const timezoneToUse = tz || currentTimezone;
    return dayjs(date).tz(timezoneToUse).format('MMM D, YYYY [at] h:mm A');
  };

  // Get profile name by ID
  const getProfileName = (profileId) => {
    const profile = profiles.find((p) => p._id === profileId);
    return profile?.name || profileId;
  };

  // Format profile list
  const formatProfiles = (profileIds) => {
    if (!Array.isArray(profileIds)) return 'N/A';
    return profileIds.map((id) => getProfileName(id)).join(', ');
  };

  // Process and format update logs
  const formattedLogs = useMemo(() => {
    if (!event.updateHistory || event.updateHistory.length === 0) {
      return [];
    }

    return event.updateHistory
      .map((log, index) => {
        let oldValue = log.oldValue;
        let newValue = log.newValue;

        // Format values based on field type
        if (log.field === 'startDate' || log.field === 'endDate') {
          oldValue = formatDateValue(log.oldValue, log.timezone);
          newValue = formatDateValue(log.newValue, log.timezone);
        } else if (log.field === 'profiles') {
          oldValue = formatProfiles(log.oldValue);
          newValue = formatProfiles(log.newValue);
        } else if (log.field === 'title') {
          oldValue = log.oldValue || 'N/A';
          newValue = log.newValue || 'N/A';
        }

        return {
          id: index,
          field: log.field,
          oldValue,
          newValue,
          updatedAt: log.updatedAt,
          timezone: log.timezone,
          timestamp: formatTimestamp(log.updatedAt, log.timezone),
        };
      })
      .reverse(); // Show most recent first
  }, [event.updateHistory, currentTimezone, profiles]);

  // Get field display name
  const getFieldDisplayName = (field) => {
    const fieldNames = {
      title: 'Title',
      profiles: 'Profiles',
      startDate: 'Start Date/Time',
      endDate: 'End Date/Time',
      timezone: 'Timezone',
    };
    return fieldNames[field] || field;
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Event Update History</h2>
            <p className={styles.subtitle}>{event.title}</p>
          </div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <GrClose size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {formattedLogs.length === 0 ? (
            <div className={styles.emptyState}>
              <GoHistory className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>No update history yet</h3>
              <p className={styles.emptyDescription}>
                Changes made to this event will appear here
              </p>
            </div>
          ) : (
            <div className={styles.timeline}>
              {formattedLogs.map((log) => (
                <div key={log.id} className={styles.logEntry}>
                  {/* Timeline dot */}
                  <div className={styles.timelineDot}></div>

                  {/* Log content */}
                  <div className={styles.logContent}>
                    <div className={styles.logHeader}>
                      <span className={styles.fieldName}>
                        {getFieldDisplayName(log.field)}
                      </span>
                      <span className={styles.timestamp}>
                        <IoMdTime size={16} />
                        {log.timestamp}
                      </span>
                    </div>

                    <div className={styles.changeBox}>
                      <div className={styles.changeItem}>
                        <span className={styles.changeLabel}>From:</span>
                        <span className={styles.oldValue}>{log.oldValue}</span>
                      </div>
                      <div className={styles.arrow}>→</div>
                      <div className={styles.changeItem}>
                        <span className={styles.changeLabel}>To:</span>
                        <span className={styles.newValue}>{log.newValue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.closeFooterButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateHistoryModal;
