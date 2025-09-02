import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Weather App © 2025</p>
      <p>Built with using Next.js & OpenWeather API</p>
    </footer>
  );
}