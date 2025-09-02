import { useState, useEffect } from "react";
import Head from 'next/head'
import ForecastList from "@/components/forcastList";
import WeatherCard from "@/components/WeatherCard";

import styles from "../styles/Home.module.css";
import HistoryList from "@/components/HistoryLIst";
import Header from "@/components/Header";
import Footer from "@/components/footer";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "396a2c38f13595afa5170404d03de87a"; 

  const fetchWeather = async (searchCity) => {
    if (!searchCity) return;
    setLoading(true);

    try {
      // FOR Current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=metric`
      );
      if (!forecastRes.ok) throw new Error("Forecast not found");
      const forecastData = await forecastRes.json();

      // FOR 5 days 
      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast.slice(0, 6));

      // Update search history
      if (!history.includes(searchCity)) {
        setHistory([searchCity, ...history].slice(0, 5));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
 const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast.slice(0, 6));
    } catch (err) {
      alert("Unable to fetch weather by location");
    } finally {
      setLoading(false);
    }
  };

  // Run only on first load → get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.warn("Geolocation blocked, please search manually.", err);
        }
      );
    }
  }, []);
   

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/fevicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>

        {loading && <p>Loading...</p>}

        {weather && <WeatherCard data={weather} />}
        {forecast.length > 0 && <ForecastList data={forecast} />}

        <HistoryList
          history={history}
          onSelect={(city) => {
            setCity(city);
            fetchWeather(city);
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
