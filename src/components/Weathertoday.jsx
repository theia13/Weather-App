export default function Weathertoday({ currentWeather }) {
  const imageURL = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
  return (
    <>
      <div className="weather-today">
        <div className="main">
          <div className="one">
            {" "}
            <div className="city-name">{currentWeather.name.toUpperCase()}</div>
            <div className="current-day">TODAY</div>
          </div>
          <div className="current-today">
            {Math.floor(currentWeather.main.temp)} &deg;
          </div>
        </div>

        <div className="current-icon">
          <img src={imageURL} alt="icon" />
        </div>

        <div className="current-temperature">
          <p className="temp-desc">
            {" "}
            {Math.floor(currentWeather.main.temp_min)} &deg; /{" "}
            {Math.floor(currentWeather.main.temp_max)} &deg;
          </p>
          <p className="weather-desc">
            {currentWeather.weather[0].description.toUpperCase()}
          </p>
        </div>
      </div>
    </>
  );
}
