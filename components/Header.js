import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1> Weather App</h1>
      <h3>Get real-time weather updates</h3>
    </header>
  );
}
