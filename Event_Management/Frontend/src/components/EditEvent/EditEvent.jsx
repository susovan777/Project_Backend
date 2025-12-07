import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useState, useEffect } from 'react';
import timezone from 'dayjs/plugin/timezone';
import styles from './EditEvent.module.css';
import { TIMEZONES } from '../../utils/timezones.js';
import useEventStore from '../../store/useAppStore.js';
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';
import { IoIosArrowDown } from 'react-icons/io';
import { ImCheckboxChecked } from 'react-icons/im';

dayjs.extend(utc);
dayjs.extend(timezone);

function EditEventModal({ event, onClose }) {
  const { profiles, updateEvent, loading } = useEventStore();

  // Form state - initialize with event data
  const [title, setTitle] = useState(event.title);
  const [selectedProfiles, setSelectedProfiles] = useState(
    event.profiles.map((p) => p._id || p)
  );
  const [timezone, setTimezone] = useState(event.eventTimezone);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Initialize date/time fields with event data in the event's timezone
  useEffect(() => {
    // Convert UTC dates to event's timezone for display
    const startInTz = dayjs(event.startDateTime).tz(event.eventTimezone);
    const endInTz = dayjs(event.endDateTime).tz(event.eventTimezone);

    setStartDate(startInTz.format('YYYY-MM-DD'));
    setStartTime(startInTz.format('HH:mm'));
    setEndDate(endInTz.format('YYYY-MM-DD'));
    setEndTime(endInTz.format('HH:mm'));
  }, [event]);

  // Handle profile selection (multi-select)
  const toggleProfile = (profileId) => {
    setSelectedProfiles((prev) => {
      if (prev.includes(profileId)) {
        return prev.filter((id) => id !== profileId);
      } else {
        return [...prev, profileId];
      }
    });
  };

  // Get selected profile names for display
  const getSelectedProfileNames = () => {
    if (selectedProfiles.length === 0) return 'Select profiles...';
    if (selectedProfiles.length === 1) {
      const profile = profiles.find((p) => p._id === selectedProfiles[0]);
      return profile?.name || 'Select profiles...';
    }
    return `${selectedProfiles.length} profiles selected`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error('Please enter event title');
      return;
    }

    if (selectedProfiles.length === 0) {
      toast.error('Please select at least one profile');
      return;
    }

    if (!startDate || !startTime) {
      toast.error('Please select start date and time');
      return;
    }

    if (!endDate || !endTime) {
      toast.error('Please select end date and time');
      return;
    }

    // Combine date and time
    const startDateTime = `${startDate}T${startTime}`;
    const endDateTime = `${endDate}T${endTime}`;

    // Validate end is after start
    if (new Date(endDateTime) <= new Date(startDateTime)) {
      toast.error('End date/time must be after start date/time');
      return;
    }

    try {
      await updateEvent(event._id, {
        title: title.trim(),
        profiles: selectedProfiles,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        eventTimezone: timezone,
      });

      onClose();
      toast.success('Event updated successfully!');
    } catch (error) {
      toast.error('Failed to update event');
      console.error(error.response?.data?.message || 'Failed to update event');
    }
  };

  // Handle backdrop click to close modal
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
          <h2 className={styles.title}>Edit Event</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <GrClose size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Title Input */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Title <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className={styles.input}
              maxLength={100}
              required
            />
          </div>

          {/* Profiles Multi-Select */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Profiles <span className={styles.required}>*</span>
            </label>

            <div className={styles.multiSelectContainer}>
              {/* Display Button */}
              <button
                type="button"
                className={styles.multiSelectButton}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <span className={styles.multiSelectText}>
                  {getSelectedProfileNames()}
                </span>
                <IoIosArrowDown
                  size={18}
                  className={`${styles.arrow} ${
                    isProfileDropdownOpen ? styles.arrowOpen : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className={styles.multiSelectDropdown}>
                  {/* Profile Checkboxes */}
                  <div className={styles.checkboxList}>
                    {profiles.length === 0 ? (
                      <div className={styles.emptyState}>
                        No profiles available
                      </div>
                    ) : (
                      profiles.map((profile) => (
                        <label
                          key={profile._id}
                          className={styles.checkboxItem}
                        >
                          <input
                            type="checkbox"
                            checked={selectedProfiles.includes(profile._id)}
                            onChange={() => toggleProfile(profile._id)}
                            className={styles.checkbox}
                          />
                          <span className={styles.checkboxLabel}>
                            {profile.name}
                          </span>
                          <span className={styles.checkboxMark}>
                            {selectedProfiles.includes(profile._id) && (
                              <ImCheckboxChecked size={16} />
                            )}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Backdrop for dropdown */}
              {isProfileDropdownOpen && (
                <div
                  className={styles.dropdownBackdrop}
                  onClick={() => setIsProfileDropdownOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Timezone Select */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Timezone <span className={styles.required}>*</span>
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={styles.select}
              required
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date & Time */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Start Date & Time <span className={styles.required}>*</span>
            </label>
            <div className={styles.dateTimeRow}>
              <div className={styles.dateInput}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.timeInput}>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          {/* End Date & Time */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              End Date & Time <span className={styles.required}>*</span>
            </label>
            <div className={styles.dateTimeRow}>
              <div className={styles.dateInput}>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.timeInput}>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventModal;
