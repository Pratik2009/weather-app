import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Weather App &copy; {new Date().getFullYear()}</p>
      <p>Built with using Next.js & OpenWeather API</p>
    </footer>
  );
}