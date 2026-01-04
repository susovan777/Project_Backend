import { Upload } from 'lucide-react';
import styles from './Header.module.css';
import Button from '../Button/Button.jsx';
import Container from '../Container/Container.jsx';
import ThemeToggle from '../Theme/ThemeToggle.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';

/**
 * Header Component
 * Main navigation bar with logo, search, upload button, and theme toggle
 *
 * @param {function} onUploadClick - Handler for upload button click
 * @param {string} searchQuery - Current search query
 * @param {function} handleSearchQuery - Search change handler
 */
const Header = ({ searchQuery, handleSearchQuery, onUploadClick }) => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          {/* Left: Logo */}
          <div className={styles.logo}>
            <h1 className={styles.logoText}>XFlix</h1>
            {/* <img src="/xflix-logo.png" alt="XFlix Logo" /> */}
          </div>

          {/* Middle: Search Bar - Center on desktop, below on mobile */}
          <div className={styles.searchBox}>
            <SearchBar
              value={searchQuery}
              onChange={handleSearchQuery}
              placeholder="Search videos by title..."
            />
          </div>

          {/* Right: Upload + Theme toggle */}
          <div className={styles.actions}>
            <Button variant="primary" size="md" onClick={onUploadClick}>
              <span>
                <Upload />
              </span>
              <span className={styles.uploadText}>Upload</span>
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
