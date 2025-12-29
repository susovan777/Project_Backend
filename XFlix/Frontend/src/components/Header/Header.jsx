import Button from '../Button/Button.jsx';
import { Upload } from 'lucide-react';
import Container from '../Container/Container.jsx';
import ThemeToggle from '../Theme/ThemeToggle.jsx';
import styles from './Header.module.css';

/**
 * Header Component
 * Main navigation bar with logo, search, upload button, and theme toggle
 *
 * @param {function} onUploadClick - Handler for upload button click
 */
const Header = ({ onUploadClick }) => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          {/* Left: Logo */}
          <div className={styles.logo}>
            <h1 className={styles.logoText}>XFlix</h1>
            {/* <img src="/xflix-logo.png" alt="XFlix Logo" /> */}
          </div>

          {/* Right: Upload + Theme toggle */}
          <div className={styles.actions}>
            <Button variant="primary" size="md" onClick={onUploadClick}>
              <span>
                <Upload />
              </span>
              <span>Upload Video</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
