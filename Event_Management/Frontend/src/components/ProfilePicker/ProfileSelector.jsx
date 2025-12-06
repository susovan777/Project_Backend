import { useState } from 'react';
import { TIMEZONES } from '../../utils/timezones.js';
import styles from './ProfileSelector.module.css';
import useAppStore from '../../store/useAppStore.js';

function ProfileSelector() {
  const {
    profiles,
    currentProfile,
    setCurrentProfile,
    createProfile,
    loading,
  } = useAppStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileTimezone, setNewProfileTimezone] = useState('Asia/Kolkata');

  // Handle profile selection
  const handleProfileSelect = (profile) => {
    setCurrentProfile(profile);
    setIsDropdownOpen(false);
  };

  // Handle adding new profile
  const handleAddProfile = async (e) => {
    e.preventDefault();

    if (!newProfileName.trim()) {
      alert('Please enter a profile name');
      return;
    }

    try {
      await createProfile({
        name: newProfileName.trim(),
        timezone: newProfileTimezone,
      });

      // Reset form
      setNewProfileName('');
      setNewProfileTimezone('Asia/Kolkata');
      setIsAddingProfile(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create profile');
    }
  };

  // console.log(profiles)
  return (
    <div className={styles.container}>
      {/* <label className={styles.label}>Select current profile...</label> */}

      <div className={styles.dropdown}>
        {/* Selected Profile Display */}
        <button
          className={styles.dropdownButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={loading}
        >
          <span className={styles.selectedText}>
            {currentProfile ? currentProfile.name : 'Select current profile...'}
          </span>
          <svg
            className={`${styles.arrow} ${
              isDropdownOpen ? styles.arrowOpen : ''
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {/* Search Input (for filtering profiles - optional for now) */}
            <div className={styles.searchSection}>
              <input
                type="text"
                placeholder="Search current profile..."
                className={styles.searchInput}
                disabled
              />
            </div>

            {/* Profile List */}
            <div className={styles.profileList}>
              {profiles.length === 0 ? (
                <div className={styles.emptyState}>No profiles found</div>
              ) : (
                profiles.map((profile) => (
                  <button
                    key={profile._id}
                    className={`${styles.profileItem} ${
                      currentProfile?._id === profile._id
                        ? styles.profileItemActive
                        : ''
                    }`}
                    onClick={() => handleProfileSelect(profile)}
                  >
                    <svg
                      className={styles.checkIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      {currentProfile?._id === profile._id && (
                        <path
                          d="M13.5 4L6 11.5L2.5 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>
                    <span>{profile.name}</span>
                  </button>
                ))
              )}
            </div>

            {/* Add Profile Section */}
            {!isAddingProfile ? (
              <div className={styles.addProfileContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setIsAddingProfile(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 3.5V12.5M3.5 8H12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Add Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleAddProfile} className={styles.addForm}>
                <input
                  type="text"
                  placeholder="Enter profile name..."
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className={styles.addInput}
                  autoFocus
                  maxLength={50}
                />
                <select
                  value={newProfileTimezone}
                  onChange={(e) => setNewProfileTimezone(e.target.value)}
                  className={styles.timezoneSelect}
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <div className={styles.addFormButtons}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProfile(false);
                      setNewProfileName('');
                    }}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    Add
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfileSelector;
