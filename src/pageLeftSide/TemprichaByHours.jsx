import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import PropTypes from "prop-types";

export default function TemprichaByHours({ weather }) {
  const swiperRef = useRef(null);

  const handleReachEnd = () => {
    if (swiperRef.current) {
      swiperRef.current.navigation.disable();
    }
  };

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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        backdropFilter: "blur(1.7210965156555176px)",
        overflow: "hidden",
      }}
      className="container w-[500px] md:w-[600px] xl:w-[755px] bg-[#00000066] mb-[53px] py-[28px] rounded-[14px] p-4"
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
        className="swiper-container"
        style={{ overflow: "hidden" }}
      >
        {weather?.hourlyData?.map((hour, index) => (
          <SwiperSlide
            key={index}
            className="p-4 flex gap-[10px] flex-col items-center"
          >
            <p className="md:text-[18px] text-[16px] text-[#D7D7D7] font-[400]">
              {formatTime(hour.dt)}
            </p>
            <img
              className="w-[35px] h-[35px]"
              src={hour.icon}
              alt={`Weather icon for ${formatTime(hour.dt)}`}
            />
            <p className="md:text-[24px] text-[20px] text-[#D7D7D7] font-[400]">
              {hour.temp ? `${(hour.temp - 273.15).toFixed(1)}°` : "N/A"}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

TemprichaByHours.propTypes = {
  weather: PropTypes.shape({
    hourlyData: PropTypes.arrayOf(
      PropTypes.shape({
        temp: PropTypes.number,
        dt: PropTypes.number,
        title: PropTypes.string,
        icon: PropTypes.string,
        date: PropTypes.string,
      })
    ),
  }),
};
