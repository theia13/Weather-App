import Weathertoday from "./components/Weathertoday";
import Weatherforecast from "./components/Weatherforecast";

export default function Weather({ currentWeather }) {
  // console.log(currentWeather);

  return (
    <>
      <div className="weather">
        <Weathertoday currentWeather={currentWeather} />
        <div className="weather-forecast">
          <Weatherforecast currentWeather={currentWeather} />
        </div>
      </div>
    </>
  );
}
