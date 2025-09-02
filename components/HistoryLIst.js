import styles from "./HistoryList.module.css";

export default function HistoryList({ history, onSelect }) {
  if (!history || history.length === 0) return null;

  return (
    <div className={styles.history}>
      <h3>Search History</h3>
      <ul>
        {history.map((city, idx) => (
          <li key={idx} onClick={() => onSelect(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}