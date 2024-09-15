// import { useQuery } from "@tanstack/react-query";
// import fetchHourlyWeatherData from "../services/CurrentWeatheResponse";

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

// const useHourlyWeather = () => {
//   const {
//     data: hourlyWeather,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["hourlyWeather"],
//     queryFn: async () => {
//       const coords = await getUserLocation();
//       return fetchHourlyWeatherData(coords.latitude, coords.longitude);
//     },
//     enabled: true,
//   });

//   return {
//     hourlyWeather,
//     error,
//     isLoading,
//   };
// };

// export default useHourlyWeather;
