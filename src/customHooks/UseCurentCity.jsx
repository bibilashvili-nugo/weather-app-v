import { useState, useEffect, useCallback } from "react";

export function useCurrentLocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocationDetails = useCallback(() => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          resolve({ latitude, longitude });
        },
        (err) => {
          setError("Error fetching location: " + err.message);
          reject(err);
        }
      );
    });
  }, []);

  useEffect(() => {
    fetchLocationDetails().catch((err) => console.error(err));
  }, [fetchLocationDetails]);

  return {
    latitude,
    longitude,
    error,
    fetchLocationDetails,
  };
}
