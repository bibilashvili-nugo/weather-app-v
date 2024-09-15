// import useWeather from "../customHooks/useWeather";
import ContentContainerShape from "./ContentContainerShape";

export default function SeaLevel() {
  // const { weather } = useWeather();
  const seaLevel = {
    label: { label: "Visibility", text: "24px", font: "400" },
    temperature: {
      // value: weather && `${weather.main.sea_level} hPa`,
      value: "lll",
      text: "55px",
      font: "400",
    },
    paddingX: "33px",
    paddingY: "50px",
  };
  return (
    <div className="w-full p-2">
      <ContentContainerShape data={seaLevel} />
    </div>
  );
}
