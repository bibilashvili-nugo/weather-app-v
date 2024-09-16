import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import { useEffect, useState } from "react";
import getFormattedWeatherData from "./services/WeatherService";

const App = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState({ q: "tbilisi" });

  const [units, setUnits] = useState("metric");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeatherData();
  }, [query, units]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              setQuery={setQuery}
              weather={weather}
              units={units}
              setUnits={setUnits}
            />
          }
        >
          <Route
            index
            element={
              <Home weather={weather} setQuery={setQuery} loading={loading} />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
