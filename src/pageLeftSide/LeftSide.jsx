import { useTranslation } from "react-i18next";
import CurrentDay from "./CurrentDay";
import Humidity from "./Humidity";
import Sensitivity from "./Sensitivity";
import TemprichaByHours from "./TemprichaByHours";

import { weatherPropTypes } from "../propTypesDefinitions";

function LeftSide({ weather, setQuery }) {
  const { t } = useTranslation();
  console.log(weather, "weather from left");
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  return (
    <div className=" flex flex-col items-center pt-[12px] pb-[30px] px-4  lg:px-8">
      <h2 className="text-[22px] self-start lg:text-[28px] text-[#FFFFFF] pt-[38px] pb-[27px] font-[510]">
        {t("Forecast of the day")}
      </h2>
      <CurrentDay weather={weather} />

      <h4
        onClick={handleLocationClick}
        className="underline self-start text-[#FFFFFF] pt-[14px] pb-[30px] text-[14px] lg:text-[16px] font-[400] cursor-pointer"
      >
        {t("current location")}
      </h4>

      <h3 className="text-[20px] self-start lg:text-[24px] text-[#FFFFFF] font-[510] pt-[40px] pb-[20px] lg:pt-[45px] lg:pb-[29px]">
        {t("weather by hours")}
      </h3>
      <TemprichaByHours weather={weather} />
      <div className="w-full justify-between gap-4">
        <div className="flex md:flex-row w-full   items-center   flex-col">
          <Humidity weather={weather} />
          <Sensitivity weather={weather} />
        </div>
      </div>
    </div>
  );
}

LeftSide.propTypes = {
  weather: weatherPropTypes.isRequired,
};

export default LeftSide;
