import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import PropTypes from "prop-types";
// import useHourlyWeather from "../customHooks/useHourlyWeather";

export default function TemprichaByHours({ hourlyData }) {
  const swiperRef = useRef(null);

  const handleReachEnd = () => {
    if (swiperRef.current) {
      swiperRef.current.navigation.disable();
    }
  };
  // const { hourlyWeather } = useHourlyWeather();
  // console.log(hourlyWeather, "hourlyWeather");
  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.on("reachEnd", handleReachEnd);
    }
    return () => {
      if (swiperInstance) {
        swiperInstance.off("reachEnd", handleReachEnd);
      }
    };
  }, []);

  return (
    <div
      style={{
        backdropFilter: "blur(1.7210965156555176px)",

        overflow: "hidden",
      }}
      className="container w-[500px] md:w-[400px] xl:w-[755px] bg-[#00000066] mb-[53px] py-[28px] rounded-[14px]  p-4"
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },

          768: {
            slidesPerView: 4,
          },

          1280: {
            slidesPerView: 7,
          },
        }}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        slideToClickedSlide
        loop={true}
        className="swiper-container"
        style={{ overflow: "hidden" }}
      >
        {hourlyData.map((hour, index) => (
          <SwiperSlide
            key={index}
            className="p-4 flex gap-[10px] flex-col items-center"
          >
            <p className="md:text-[18px] text-[16px]  text-[#D7D7D7] font-[400]">
              {hour.time}
            </p>
            <img className="w-[35px] h-[35px]" src={hour.icon} alt="" />
            <p className="md:text-[24px] text-[20px] text-[#D7D7D7] font-[400]">
              {hour.temp}°C
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

TemprichaByHours.propTypes = {
  hourlyData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
    })
  ).isRequired,
};
