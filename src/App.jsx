import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/WeatherService";
import i18n from "i18next";
const App = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState({ q: "tbilisi" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const data = await getFormattedWeatherData(query);
        setWeather(data);
      } catch (error) {
        setError("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [query]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
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
