import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./Weather.jsx";
import { IoSearch } from "react-icons/io5";

function App() {
  const [currentWeather, setcurrentWeather] = useState();

  const [searchQuery, setSearchQuery] = useState();
  const [isLoading, setisLoading] = useState(true);

  async function fetchData(query) {
    setisLoading(true);
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${
      import.meta.env.VITE_CURRENT
    }&units=metric`;
    try {
      const res = await fetch(URL);
      if (res.ok) {
        const data = await res.json();
        setcurrentWeather(data);

        // console.log(data);
      } else {
        throw new Error(`${res.status}`);
      }
      // console.log(res);
    } catch (e) {
      console.log(e);
    }
    setisLoading(false);
  }

  const handleSearch = () => {
    fetchData(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData(searchQuery);
    }
  };

  useEffect(() => {
    fetchData("Ahmedabad");
  }, []);

  if (isLoading) {
    return (
      <div>
        {" "}
        <p> Loading...</p>{" "}
      </div>
    );
  }
  return (
    <>
      <div className="searchContainer">
        <div>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search"
            className="searchField"
            value={searchQuery}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        <div>
          {" "}
          <button onClick={handleSearch} className="searchBtn">
            <IoSearch />
          </button>
        </div>
      </div>
      <Weather currentWeather={currentWeather} />
    </>
  );
}

export default App;

// function fetchThenCatch() {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=Vadodara&appid=fc0491a4292f1100e6c4ef5c065c7053&units=metric`
//   )
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error(`Response status ${res.status}`);
//       }
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// }
