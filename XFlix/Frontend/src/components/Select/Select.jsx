import styles from './Select.module.css';

/**
 * Select Component
 * Reusable dropdown select
 *
 * @param {string} label - Select label
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 * @param {Array} options - Array of {value, label} objects
 * @param {string} error - Error message
 * @param {boolean} required - Required field
 * @param {string} name - Select name
 */
const Select = ({
  name,
  value,
  label,
  error,
  onChange,
  options = [],
  className = '',
  required = false,
  placeholder = 'Select...',
  ...props
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {/* Label element */}
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Select element */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.select} ${error ? styles.error : ''}`}
        required={required}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          <option key={option.value} value={option.value}>
            {option.label}
          </option>;
        })}
      </select>

      {/* Error message */}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Select;
