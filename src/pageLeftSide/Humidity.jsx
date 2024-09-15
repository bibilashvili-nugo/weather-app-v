import ContentContainerShape from "./ContentContainerShape";
// import useWeather from "../customHooks/useWeather";

export default function Humidity() {
  // const { weather } = useWeather();
  const humidityData = {
    label: { label: "Humidity", text: "24px", font: "400" },
    humidity: {
      // humidity: weather ? `${weather.main.humidity} %` : "N/A",
      humidity: "lll",
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
