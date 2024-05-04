import { useEffect, useState } from "react";
import Search from "../search-bar";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=00a212920a14e0488175e5bfabf31b5e`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function handleCitySearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate(){
    return new Date().toLocaleDateString('en-us', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'

    })
  }

  useEffect(() => {
    fetchWeatherData("Kathmandu");
  }, []);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleCitySearch={handleCitySearch}
      />
      {loading ? (
        <div className="loading">Data loading ! Please wait</div>
      ) : (
        <div>
            <div className="city-name">
          <h2>
            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
          </h2>
        </div>
        <div className="date">
            {getCurrentDate()}
        </div>
        <div className="temp">{weatherData?.main?.temp}</div>
        <p className="description">{weatherData?.weather[0]?.description}</p>
        <div className="weather-info">
            <div className="column">
                <div>
                    <p className="wind">{weatherData?.wind?.speed}</p>
                    <p>Wind Speed</p>
                </div>
            </div>
            <div className="column">
            <div>
                <p className="humidity">{weatherData?.main?.humidity}</p>
                <p>Humidity</p>
                </div>
            </div>
        </div>
        </div>
      )}
    </div>
  );
}
