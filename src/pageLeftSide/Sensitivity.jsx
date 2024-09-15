import ContentContainerShape from "./ContentContainerShape";
// import useWeather from "../customHooks/useWeather";

export default function Sensitivity() {
  // const { weather } = useWeather();
  // const kelvinToCelsius = (kelvin) => kelvin - 273.15;

  const sensitivityData = {
    label: { label: "Sensitivity", text: "24px", font: "400" },
    temperature: {
      value: "kk",
      // weather && `${kelvinToCelsius(weather.main.feels_like).toFixed(0)}°C`,
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
}
