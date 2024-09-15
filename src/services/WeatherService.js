import { DateTime } from "luxon";

const API_KEY = "c3eaa28172292c30f8ef43e381957755";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  secs,
  offsetInSeconds,
  format = "cccc, dd LLL | Local time: hh:mm a"
) => {
  const offset = `UTC${offsetInSeconds >= 0 ? "+" : ""}${
    offsetInSeconds / 3600
  }`;
  const dateTime = DateTime.fromSeconds(secs).setZone(offset);
  return dateTime.isValid ? dateTime.toFormat(format) : "Invalid DateTime";
};

const formatCurrent = (data) => {
  const {
    main: { temp, feels_like, humidity, temp_min, temp_max },
    name,
    dt,
    sys: { country },
    timezone,
    weather,
    coord: { lat, lon },
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    name,
    humidity,
    temp_min,
    temp_max,
    details,
    country,
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
    icon: iconUrlFromCode(icon),
  };
};

const aggregateDailyData = (data) => {
  const dailyDataMap = new Map();

  data.forEach((item) => {
    const date = DateTime.fromSeconds(item.dt).toFormat("yyyy-MM-dd");

    if (!dailyDataMap.has(date)) {
      dailyDataMap.set(date, {
        tempMin: item.main.temp,
        tempMax: item.main.temp,
        icon: item.weather[0].icon,
        title: DateTime.fromSeconds(item.dt).toFormat("cccc"),
        date: item.dt_txt,
      });
    } else {
      const existing = dailyDataMap.get(date);
      existing.tempMin = Math.min(existing.tempMin, item.main.temp);
      existing.tempMax = Math.max(existing.tempMax, item.main.temp);
    }
  });

  return Array.from(dailyDataMap.values());
};

const formatForecastWeather = (currentTime, offset, forecastData) => {
  const hourly = forecastData.list
    .map((item) => ({
      temp: item.main.temp,
      dt: item.dt,
      title: formatToLocalTime(item.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(item.weather[0].icon),
      date: item.dt_txt,
    }))
    .filter((entry) => entry.title !== "Invalid DateTime");

  const hourlyData = hourly.slice(0, 8);
  const dailyData = aggregateDailyData(forecastData.list);

  return { hourlyData, dailyData };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrent);
    const { lat, lon, timezone } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    }).then((forecastData) =>
      formatForecastWeather(formattedCurrentWeather.dt, timezone, forecastData)
    );

    return {
      ...formattedCurrentWeather,
      ...formattedForecastWeather,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default getFormattedWeatherData;
