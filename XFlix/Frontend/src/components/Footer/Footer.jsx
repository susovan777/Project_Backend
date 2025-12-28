import Container from '../Container/Container.jsx';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Simple footer with copyright info
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <p className={styles.text}>
            © {currentYear} XFlix. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
