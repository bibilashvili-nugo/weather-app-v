import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";

const API_KEY = "qfqb4mH8tbAcAUEgSNeNvVk6g4z1Rj0G";
const API_URL = `https://api.tomorrow.io/v4/weather/forecast?location=batumi&apikey=${API_KEY}&timesteps=daily&startTime=${
  new Date().toISOString().split("T")[0]
}&endTime=${
  new Date(new Date().setDate(new Date().getDate() + 13))
    .toISOString()
    .split("T")[0]
}`;

const formatDate = (dateString) => {
  const options = { weekday: "long", day: "numeric", month: "long" };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ka-GE", options).format(date);
};
36;

const RightSide = ({ setQuery }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Full API Response:", data);

        const dailyData = data?.timelines?.daily ?? [];
        setForecast(dailyData);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveClick = () => {
    alert(`Selected date: ${selectedDate.toDateString()}`);
    setCalendarVisible(false);
  };

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-600">
        Loading forecast data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg text-red-600">Error: {error}</div>
    );
  }

  if (forecast.length === 0) {
    return (
      <div className="text-center text-lg text-gray-600">
        No forecast data available.
      </div>
    );
  }

  return (
    <>
      <div className="p-4 relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl pt-[28px] pb-[27px] font-semibold text-[#FFF]">
            {t("week Forecast")}
          </h1>
          <AiOutlineCalendar
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => setCalendarVisible(!isCalendarVisible)}
          />
        </div>

        {isCalendarVisible && (
          <div
            ref={calendarRef}
            className="absolute top-4 right-4 p-4 bg-white shadow-lg rounded-lg z-10"
          >
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="react-calendar" // Ensure the class is applied
            />
            <button
              className="float-right mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-4 max-h-[880px] overflow-y-auto">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between p-4 bg-[#00000066] text-white rounded-lg"
              style={{
                flex: "1 1 calc(33.333% - 1rem)",
                minWidth: "200px",
                height: "184px",
                borderRadius: "12px",
                opacity: "0.9",
              }}
            >
              <div className="mb-2 text-center">
                <h2 className="text-xl font-medium">
                  {formatDate(day.time).split(", ")[1]}
                </h2>
                <p>{formatDate(day.time).split(", ")[0]}</p>
              </div>
              <div className="mb-2">
                <img
                  src={`/weatherIcons/filled sun.svg`}
                  alt="Weather Icon"
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold">
                    {Math.round(day.values?.temperatureMax) ?? "N/A"}°C
                  </p>
                  <img className="w-8 mt-1" src="/sun.png" alt="Sun" />
                </div>
                <span className="text-sm">|</span>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold m-b-2">
                    {Math.round(day.values?.temperatureMin) ?? "N/A"}°C
                  </p>
                  <img className="w-4 mt-1.5" src="/moon.png" alt="Moon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightSide;
