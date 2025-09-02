// import React from 'react'
// import Image from 'next/image'
// function WeatherCard({data}) {
  
//   return (
//     <div>
//       <div>
//         <div>
//           <Image src='' alt='cloud' />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WeatherCard


import styles from './WeatherCard.module.css'

export default function WeatherCard({ data }) {
  if (!data || !data.main) return null;

  return (
    <div className={styles.card}>
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      <p>{data.weather[0].description}</p>
      <h3>{Math.round(data.main.temp)}°C</h3>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} m/s</p>
    </div>
  );
}