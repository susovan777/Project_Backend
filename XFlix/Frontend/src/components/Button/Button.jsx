import styles from './Button.module.css';

/**
 * Button Component
 *
 * @param {string} variant - 'primary' | 'secondary' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  children,
  ...props
}) => {
  const buttonClass = `
    ${styles.button}
    ${styles[variant]}
    ${styles[size]}
    ${disabled ? styles.disabled : ''}
    ${className}
    `.trim();

  return (
    <button
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
