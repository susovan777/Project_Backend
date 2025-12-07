import { useEffect, useState } from 'react';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import useAppStore from './store/useAppStore.js';
import EventForm from './components/EventForm/EventForm.jsx';
import EventList from './components/EventList/EventList.jsx';
import ProfileSelector from './components/ProfilePicker/ProfileSelector.jsx';
import EditEventModal from './components/EditEvent/EditEvent.jsx';
import UpdateHistoryModal from './components/UpdateHistory/UpdateHistory.jsx';

function App() {
  const { getProfiles, getAllEvents, deleteEvent } = useAppStore();

  // Modal states
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingLogsEvent, setViewingLogsEvent] = useState(null);

  // Fetch profiles when app loads
  useEffect(() => {
    getProfiles();
    getAllEvents();
  }, [getProfiles, getAllEvents]);

  // Handler for editing event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  // Handler for viewing logs
  const handleViewLogs = (event) => {
    setViewingLogsEvent(event);
  };

  // Handler for deleting event
  const handleDeleteEvent = (event) => {
    deleteEvent(event);
    console.log('⚠️ Event Deleted Successfully');
    toast.success('Event deleted successfully!');
  };

  return (
    <div className={styles.app}>
      <Toaster />
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Event Management</h1>
            <p className={styles.subtitle}>
              Create and manage events across multiple timezones
            </p>
          </div>

          <div className={styles.profileSelectorWrapper}>
            <ProfileSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Left Column - Create Event */}
        <div className={styles.leftColumn}>
          <EventForm />
        </div>

        {/* Right Column - Events List */}
        <div className={styles.rightColumn}>
          <EventList
            onEditEvent={handleEditEvent}
            onViewLogs={handleViewLogs}
            onDelete={handleDeleteEvent}
          />
        </div>
      </main>

      {/* Edit Event Modal */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}

      {/* Update History Modal */}
      {viewingLogsEvent && (
        <UpdateHistoryModal
          event={viewingLogsEvent}
          onClose={() => setViewingLogsEvent(null)}
        />
      )}
    </div>
  );
}

export default App;
