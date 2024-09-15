/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = ({ setQuery, units, weather, setUnits }) => {
  const backgroundImage =
    weather?.details === "clear"
      ? 'url("/weatherBackGrounds/d8e9712b61aba22c5ca6dac8c7336dcb.jpeg")'
      : weather?.details === "rain"
      ? 'url("/weatherBackGrounds/ba3643384b36f44b8e979e67ff16af11.png")'
      : 'url("/weatherBackGrounds/d8e9712b61aba22c5ca6dac8c7336dcb.jpeg")';

  return (
    <div
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex w-full flex-col min-h-screen"
    >
      <Header setQuery={setQuery} units={units} setUnits={setUnits} />
      <main className="p-7">
        <Outlet />
      </main>
      <footer className="p-7 w-full bg-gray-100">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Layout;
