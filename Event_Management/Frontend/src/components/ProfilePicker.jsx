import { useState } from 'react';
import { FaChevronDown, FaCheck, FaSearch, FaPlus } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { FiPlus } from 'react-icons/fi';

const ProfilePicker = ({
  profiles,
  currentProfileId,
  setCurrentProfileId,
  addProfile,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('list'); // 'list' or 'add'
  const [searchQuery, setSearchQuery] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [addError, setAddError] = useState(null);

  const isListEmpty = profiles.length === 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setMode('add');
    setSearchQuery('');
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
  };

  const currentProfile = profiles.find((p) => p._id === currentProfileId);

  return (
    <div className="profile-container">
      <div className="profile-display-button" onClick={handleToggle}>
        {currentProfile ? currentProfile.name : 'Select profile...'}
        <FaChevronDown style={{ fontSize: '12px' }} />
      </div>

      {/* Dropdown Panel */}
      <div className="profile-dropdown-panel">
        <div className="search-input-container">
          <GoSearch style={{ color: '#aaa' }} />
          <input
            type="text"
            value={searchQuery}
            className="search-input"
            placeholder="Search current profile..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isListEmpty && searchQuery.length > 0 && (
          <div className="no-profile-found">No profile found.</div>
        )}

        <div className="profile-list">
          {profiles.map((p) => {
            return (
              <div key={p._id} className="profile-item">
                {p.name}
              </div>
            );
          })}
        </div>
        {/* Add Profile Button */}
        <div className="add-profile-container">
          <button
            className="add-profile-button"
            onClick={() => {
              setMode('add');
            }}
          >
            <FiPlus className="add-icon" /> Add Profile
          </button>
        </div>

        {mode === 'add' && (
          <form onSubmit={handleCreateProfile} className="quick-add-section">
            <div className="profile-creation-row">
              <input
                type="text"
                placeholder="Profile name"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="profile-name-input"
              />
              <button
                type="submit"
                className="add-button"
                style={{ backgroundColor: '#6c63ff' }}
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePicker;
