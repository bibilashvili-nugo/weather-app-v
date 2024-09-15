const API_KEY = "c3eaa28172292c30f8ef43e381957755";

const fetchWeatherData = async (lat, lon) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(API_URL);

  if (response.status === 429) {
    throw new Error("Too many requests. Please try again later.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw new Error("Network response was not ok: " + errorData.message);
  }

  return response.json();
};

export default fetchWeatherData;
