import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/WeatherService";

const App = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState({ q: "tbilisi" });
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("matric");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
      // setLoading(true);
      // try {
      //   const data = await getFormattedWeatherData(query);
      //   setWeather(data);
      //   console.log(data);
      // } catch (error) {
      //   setError("Error fetching weather data");
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchWeatherData();
  }, [query, units]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout setQuery={setQuery} units={units} setUnits={setUnits} />
          }
        >
          <Route
            index
            element={<Home weather={weather} error={error} loading={loading} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
