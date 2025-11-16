import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ProfilePicker = ({
  profiles,
  currentProfileId,
  setCurrentProfileId,
  addProfile,
}) => {
  // Local state for the dropdown panel visibility
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Local state for the quick-add input field
  const [newProfileName, setNewProfileName] = useState('');
  const [addError, setAddError] = useState(null);

const CurrentProfile = profiles.find(p => p._id === currentProfileId)

  return (
    <div className="profile-container">
      <div className="profile-display-button" onClick={''}>
        Select profile...
        {/* {currentProfile ? currentProfile.name : 'Select profile...'} */}
        <FaChevronDown style={{ fontSize: '12px' }} />
      </div>
    </div>
  );
};

export default ProfilePicker;
