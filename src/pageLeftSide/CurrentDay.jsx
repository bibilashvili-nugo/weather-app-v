import PropTypes from "prop-types";

const CurrentDay = ({ weather, units }) => {
  if (!weather) return <div>No weather data available</div>;

  const { name, temp, details } = weather;

  const formattedDate = new Date().toLocaleDateString("ka-GE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  // utils/toTemperature.js
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  const kelvinTemperature = temp;
  console.log(temp, "temp");

  const displayTemp =
    units === "metric"
      ? `${temp.toFixed(1)}°C`
      : `${celsiusToFahrenheit(temp).toFixed(1)}°F`;

  return (
    <div className="bg-[#00000066] w-[500px] md:w-[600px] xl:w-[755px] text-[#FFFFFF] px-[52px] py-[35px] rounded-[8px]">
      <div>
        <div className="flex justify-between">
          <span className="md:text-[40px] text-[35px] font-[510]">
            {name || "Location not available"}
          </span>
          <span className="md:text-[24px] text-[20px] font-[400] capitalize">
            {details}
          </span>
        </div>
        <div className="flex items-center h-[70px] justify-between">
          <span className="md:text-[24px] text-[20px] font-[400]">
            {formattedDate}
          </span>
          <span className="text-[72px] font-[400]">
            {temp ? displayTemp : "loading"}
          </span>
        </div>
      </div>
    </div>
  );
};
CurrentDay.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string,
    temp: PropTypes.number,
    details: PropTypes.string,
  }),
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired, // Ensure units is passed correctly
};
export default CurrentDay;
