import { useEffect } from "react";
import { useCurrentLocation } from "../services/CurrentCity";

const CurrentDay = () => {
  const formattedDate = new Date().toLocaleDateString("ka-GE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const { address, fetchLocationDetails } = useCurrentLocation();

  useEffect(() => {
    fetchLocationDetails();
  }, [fetchLocationDetails]);

  return (
    <div className="bg-[#00000066] w-[500px] md:w-[600px] xl:w-[755px] text-[#FFFFFF] px-[52px] py-[35px] rounded-[8px]">
      <div>
        <div className="flex justify-between">
          <span className="md:text-[40px] text-[35px] font-[510]">
            {address || "Location not available"}
          </span>
          <span className="md:text-[24px] text-[20px] font-[400] capitalize">
            {"Weather not available"}
          </span>
        </div>
        <div className="flex items-center h-[70px] justify-between">
          <span className="md:text-[24px] text-[20px] font-[400]">
            {formattedDate}
          </span>
          <span className="text-[72px] font-[400]">
            kkk
            {/* {weather
              ? kelvinToCelsius(weather.main.temp).toFixed(2) + "°"
              : "Loading..."} */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentDay;
