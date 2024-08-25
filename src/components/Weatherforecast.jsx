import { useEffect, useState } from "react";

const dayOfWeek = (unix) => {
  const date = new Date(unix * 1000);
  const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "short" });

  return dateFormat.format(date).toUpperCase();
};

export default function Weatherforecast({ currentWeather }) {
  const [forecastWeather, setforecastWeather] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const lat = currentWeather.coord.lat;
  const lon = currentWeather.coord.lon;

  const URL = `https://openweathermap.org/data/2.5/onecall?exclude=alerts&units=metric&appid=${
    import.meta.env.VITE_FORECAST
  }&lat=${lat}&lon=${lon}`;

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      try {
        const res = await fetch(URL);
        if (res.ok) {
          const data = await res.json();
          setforecastWeather(data.daily);
        } else {
          throw new Error(`${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }
      setisLoading(false);
    }

    fetchData();
  }, [URL]);

  if (isLoading) {
    return (
      <div className="loading-container">
        {" "}
        <p> Loading...</p>{" "}
      </div>
    );
  }

  return (
    <>
      <div className="title-forecast">7-DAY-FORECAST</div>

      <div className="forecast">
        {" "}
        <div className="forecast-temp">
          {forecastWeather.slice(1).map((day) => (
            <div key={day.dt}>
              <div className="forecastIconContainer">
                {" "}
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="forecast-icons"
                  className="forecastIcon"
                />{" "}
              </div>
              <span className="forecast-temps">
                {" "}
                {Math.floor(day.temp.min)} &deg; / {Math.floor(day.temp.max)}{" "}
              </span>
              &deg;
              <div className="forecast-days"> {dayOfWeek(day.dt)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
