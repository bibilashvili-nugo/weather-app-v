import PropTypes from "prop-types";
import { kelvinToCelsius } from "../utils/toTemperature";
import ContentContainerShape from "./ContentContainerShape";

const Sensitivity = ({ weather }) => {
  if (!weather) return <div>No weather data available</div>;

  const sensitivityData = {
    label: { label: "Feels like", text: "24px", font: "400" },
    temperature: {
      value: `${kelvinToCelsius(weather.feels_like).toFixed(0)}°C`,
      text: "55px",
      font: "400",
    },
    paddingX: "33px",
    paddingY: "50px",
  };

  return (
    <div className="w-full p-2">
      <ContentContainerShape data={sensitivityData} />
    </div>
  );
};

Sensitivity.propTypes = {
  weather: PropTypes.shape({
    feels_like: PropTypes.number,
  }),
};

export default Sensitivity;
