import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './ProfileSelector.module.css';
import { TIMEZONES } from '../../utils/timezones.js';
import useAppStore from '../../store/useAppStore.js';
import { GrAdd, GrCheckmark } from 'react-icons/gr';
import { IoIosArrowDown } from 'react-icons/io';
import { RiDeleteBin4Line } from 'react-icons/ri';

function ProfileSelector() {
  const {
    profiles,
    currentProfile,
    setCurrentProfile,
    createProfile,
    deleteProfile,
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
      toast('Please enter a profile name', {
        duration: 4000,
        icon: '⚠️',
      });
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
      toast.success('New profile added');
    } catch (error) {
      toast.error('Failed to create profile, see console for detail');
      console.error(
        error.response?.data?.message || 'Failed to create profile'
      );
    }
  };

  const handleDeleteProfile = async (id) => {
    try {
      await deleteProfile(id);
      toast.success('Profile deleted successfully');
    } catch (error) {
      toast.error('Failed to delete profile, see console for detail');
      console.error(
        error.response?.data?.message || 'Failed to delete profile'
      );
    }
  };

  // console.log(profiles)
  return (
    <div className={styles.container}>
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
          <IoIosArrowDown
            size={20}
            className={`${styles.arrow} ${
              isDropdownOpen ? styles.arrowOpen : ''
            }`}
          />
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
                    <span className={styles.checkIcon}>
                      {currentProfile?._id === profile._id && <GrCheckmark />}
                    </span>
                    <span>{profile.name}</span>
                    <span
                      className={styles.deleteIcon}
                      onClick={() => handleDeleteProfile(profile._id)}
                    >
                      <RiDeleteBin4Line size={18} />
                    </span>
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
                  <GrAdd />
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
