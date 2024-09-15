// import { useQuery } from "@tanstack/react-query";
// import fetchWeatherData from "../services/HourlyResponse";

// const getUserLocation = () => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("Geolocation is not supported by this browser."));
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => resolve(position.coords),
//       (error) => reject(error)
//     );
//   });
// };

// const useWeather = () => {
//   const {
//     data: weather,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["weather"],
//     queryFn: async () => {
//       const coords = await getUserLocation();

//       return fetchWeatherData(coords.latitude, coords.longitude);
//     },
//     enabled: true,
//   });

//   const kelvinToCelsius = (kelvin) => kelvin - 273.15;

//   return {
//     weather,
//     error,
//     isLoading,
//     kelvinToCelsius,
//   };
// };

// export default useWeather;
