import styles from './Container.module.css';

/**
 * Container Component
 * Wraps content with max-width and padding
 *
 * @param {ReactNode} children - Content to wrap
 * @param {string} className - Additional CSS classes
 */
const Container = ({ children, className = '' }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default Container;
