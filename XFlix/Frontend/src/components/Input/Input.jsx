import styles from './Input.module.css';

/**
 * Input Component
 * Reusable text input with label and error message
 *
 * @param {string} label - Input label
 * @param {string} name - Input name
 * @param {string} type - Input type (text, email, url, date, etc.)
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Required field
 * @param {string} error - Error message
 */
const Input = ({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`${styles.wrapper}`}>
      {label && <label htmlFor=""></label>}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...props}
      />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
