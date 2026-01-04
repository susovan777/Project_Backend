import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';
import { useTheme } from '../../hooks/useTheme.js';

/**
 * ThemeToggle Component
 * Toggles between light and dark mode
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
