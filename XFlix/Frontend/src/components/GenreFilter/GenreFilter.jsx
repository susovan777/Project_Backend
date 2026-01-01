import { GENRES } from '../../utils/constants';
import styles from './GenreFilter.module.css';

/**
 * GenreFilter Component
 * Horizontal scrollable genre filter buttons
 *
 * @param {String} selectedGenre - Currently selected genre
 * @param {Function} onGenreChange - Genre change handler
 */
const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollWrapper}>
        {GENRES.map((genre) => (
          <button
            key={genre.value}
            className={`${styles.button} ${
              selectedGenre === genre.value ? styles.active : ''
            }`}
            onClick={() => onGenreChange(genre.value)}
          >
            {genre.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
