import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import styles from './EventForm.module.css';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { ImCheckboxChecked } from 'react-icons/im';
import useAppStore from '../../store/useAppStore.js';
import { TIMEZONES } from '../../utils/timezones.js';

function EventForm() {
  const { profiles, createEvent, currentProfile } = useAppStore();

  // Form state
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [timezone, setTimezone] = useState('Asia/Calcutta');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('09:00');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Set current profile as default when it changes
  useEffect(() => {
    if (currentProfile && selectedProfiles.length === 0) {
      setSelectedProfiles([currentProfile._id]);
    }
  }, [currentProfile]);

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
    setLoading(true);

    // Validation
    if (!title.trim()) {
      toast.error('Please enter event title');
      setLoading(false);
      return;
    }

    if (selectedProfiles.length === 0) {
      toast.error('Please select at least one profile');
      setLoading(false);
      return;
    }

    if (!startDate || !startTime) {
      toast.error('Please select start date and time');
      setLoading(false);
      return;
    }

    if (!endDate || !endTime) {
      toast.error('Please select end date and time');
      setLoading(false);
      return;
    }

    // Combine date and time
    const startDateTime = `${startDate}T${startTime}`;
    const endDateTime = `${endDate}T${endTime}`;

    // Validate end is after start
    if (new Date(endDateTime) <= new Date(startDateTime)) {
      toast.error('End date/time must be after start date/time');
      setLoading(false);
      return;
    }

    console.log(startDateTime);
    console.log(endDateTime);

    try {
      await createEvent({
        title: title.trim(),
        profiles: selectedProfiles,
        startDate: startDateTime,
        endDate: endDateTime,
        eventTimezone: timezone,
      });

      // Reset form
      setTitle('');
      setSelectedProfiles(currentProfile ? [currentProfile._id] : []);
      setStartDate('');
      setStartTime('09:00');
      setEndDate('');
      setEndTime('09:00');

      toast.success('Event created successfully!');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to create event!');
      console.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Event</h2>

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
                {/* Search Input - Optional for now */}
                <div className={styles.searchSection}>
                  <input
                    type="text"
                    placeholder="Search profiles..."
                    className={styles.searchInput}
                    disabled
                  />
                </div>

                {/* Profile Checkboxes */}
                <div className={styles.checkboxList}>
                  {profiles.length === 0 ? (
                    <div className={styles.emptyState}>
                      No profiles available
                    </div>
                  ) : (
                    profiles.map((profile) => (
                      <label key={profile._id} className={styles.checkboxItem}>
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

                {/* Add Profile Link */}
                <div className={styles.addProfileHint}>
                  <span>
                    Don't see a profile? Use the selector above to add one.
                  </span>
                </div>
              </div>
            )}

            {/* Backdrop */}
            {isProfileDropdownOpen && (
              <div
                className={styles.backdrop}
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

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          <FaPlus size={16} />
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}

export default EventForm;
