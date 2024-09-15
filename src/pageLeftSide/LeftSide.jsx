import { useTranslation } from "react-i18next";
import CurrentDay from "./CurrentDay";
import Humidity from "./Humidity";
import Sensitivity from "./Sensitivity";
import TemprichaByHours from "./TemprichaByHours";

import { weatherPropTypes } from "../propTypesDefinitions";

function LeftSide({ weather }) {
  const { t } = useTranslation();
  console.log(weather, "weather from left");

  return (
    <div className="max-w-[860px] pt-[12px] pb-[30px] px-4 lg:px-8">
      <h2 className="text-[22px] lg:text-[28px] text-[#FFFFFF] pt-[38px] pb-[27px] font-[510]">
        {t("Forecast of the day")}
      </h2>
      <CurrentDay weather={weather} />

      <h4 className="underline text-[#FFFFFF] pt-[14px] pb-[30px] text-[14px] lg:text-[16px] font-[400] cursor-pointer">
        {t("current location")}
      </h4>

      <p className="text-[#FF0000]">
        {t(
          "Please allow location access or enable it in your browser settings."
        )}
      </p>
      <p className="text-[#FFFFFF]">kkk</p>

      <h3 className="text-[20px] lg:text-[24px] text-[#FFFFFF] font-[510] pt-[40px] pb-[20px] lg:pt-[45px] lg:pb-[29px]">
        {t("weather by hours")}
      </h3>
      <TemprichaByHours weather={weather} />
      <div className="w-full justify-between gap-4">
        <div className="flex">
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
