import { Search, X } from 'lucide-react';
import styles from './SearchBar.module.css';

/**
 * SearchBar Component
 * Search input with clear button
 *
 * @param {String} value - Search query value
 * @param {Function} onChange - Change handler
 * @param {String} placeholder - Placeholder text
 */
const SearchBar = ({ value, onChange, placeholder = 'Search videos...' }) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className={styles.container}>
      <Search className={styles.icon} size={20} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
