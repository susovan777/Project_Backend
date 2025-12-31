import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

/**
 * Modal Component
 * Reusable modal dialog
 *
 * @param {boolean} isOpen - Modal open state
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl'
 */
const Modal = ({ title, size = 'md', children, onClose, isOpen }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onclose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onclose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
