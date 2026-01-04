import { Upload } from 'lucide-react';
import styles from './Header.module.css';
import Button from '../Button/Button.jsx';
import Container from '../Container/Container.jsx';
import ThemeToggle from '../Theme/ThemeToggle.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';

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
          <div
            className={styles.logo}
            onClick={() => (window.location.href = '/')} // Go to homepage
          >
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

          {/* Right: Desktop Actions - Hidden on mobile */}
          <div className={styles.actions}>
            <Button variant="primary" size="md" onClick={onUploadClick}>
              <span>
                <Upload />
              </span>
              <span className={styles.uploadText}>Upload</span>
            </Button>

            <ThemeToggle />
          </div>

          {/* Mobile Menu - Visible on mobile only */}
          <div className={styles.mobileMenu}>
            <MobileMenu onUploadClick={onUploadClick} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
