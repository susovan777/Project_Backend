import { useEffect } from 'react';
import styles from './App.module.css';
import useAppStore from './store/useAppStore.js';
import EventForm from './components/EventForm.jsx';
import EventList from './components/EventList.jsx';
import ProfileSelector from './components/ProfileSelector.jsx';

function App() {
  const { getProfiles, profiles } = useAppStore();

  // Fetch profiles when app loads
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div className={styles.app}>
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
          <EventList />
        </div>
      </main>
    </div>
  );
}

export default App;
