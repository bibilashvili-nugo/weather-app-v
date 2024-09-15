import { weatherPropTypes } from "../propTypesDefinitions";
import ContentContainerShape from "./ContentContainerShape";

export default function Humidity({ weather }) {
  const humidityData = {
    label: { label: "Humidity", text: "24px", font: "400" },
    humidity: {
      humidity: weather ? `${weather.humidity} %` : "N/A",
      text: "55px",
      font: "400",
    },
    paddingX: "33px",
    paddingY: "50px",
  };

  return (
    <div className="w-full  p-2">
      <ContentContainerShape data={humidityData} />
    </div>
  );
}
Humidity.propTypes = {
  weather: weatherPropTypes.isRequired,
};
