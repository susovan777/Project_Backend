import { useState } from 'react';
import styles from './MobileMenu.module.css';
import { useTheme } from '../../hooks/useTheme.js';
import { Menu, Moon, Sun, Upload, X } from 'lucide-react';

/**
 * MobileMenu Component
 * Hamburger menu for mobile devices
 * Shows Upload and Theme toggle options
 */
const MobileMenu = ({ onUploadClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleUpload = () => {
    onUploadClick();
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />

          {/* Menu Panel */}
          <div className={styles.menu}>
            <div className={styles.menuContent}>
              {/* Upload Button */}
              <button onClick={handleUpload} className={styles.menuItem}>
                <Upload size={20} />
                <span>Upload Video</span>
              </button>

              {/* Theme Toggle */}
              <button className={styles.menuItem} onClick={handleThemeToggle}>
                {theme === 'light' ? (
                  <>
                    <Moon size={20} />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun size={20} />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
