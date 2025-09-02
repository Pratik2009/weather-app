import styles from "./ForcastList.module.css";
import Image from "next/image";

export default function ForecastList({ data }) {
  return (
    <div className={styles.forecast}>
      <h3 className={styles.heading}>5-day Weather forecast</h3>
      <div className={styles.list}>
        {data.map((day, idx) => (
          <div key={idx} className={styles.item}>
            <p>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>

            <div className={styles.description}>
              <Image
                src="/images/cloudy.png"
                alt="cloud"
                width={30}
                height={30}
              />
              <p>{day.weather[0].description}</p>
            </div>

            <h4>{Math.round(day.main.temp)}°C</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
