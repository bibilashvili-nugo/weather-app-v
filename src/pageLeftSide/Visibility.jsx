import ContentContainerShape from "./ContentContainerShape";
// import useWeather from "../customHooks/useWeather";

export default function Visibility() {
  // const { weather } = useWeather();
  const visibilityData = {
    label: { label: "Visibility", text: "24px", font: "400" },
    temperature: {
      // value: weather && `${(weather.visibility / 1000).toFixed(1)} km`,
      value: "kk",
      text: "55px",
      font: "400",
    },
    paddingX: "33px",
    paddingY: "50px",
  };
  return (
    <div className="w-full p-2">
      <ContentContainerShape data={visibilityData} />
    </div>
  );
}
