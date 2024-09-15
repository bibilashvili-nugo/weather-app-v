import { useState, useCallback } from "react";

export function useCurrentLocation() {
  const [address, setAddress] = useState(" ");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLocationDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }

          const data = await response.json();
          console.log("API Response:", data);

          if (data && data.address) {
            const city = data.address.city || data.address.town || "Unknown";
            setAddress(city);
          } else {
            setAddress("Unknown");
          }
          setLoading(false);
        },
        (error) => {
          setError("Error fetching location: " + error.message);
          setLoading(false);
        }
      );
    } catch (error) {
      setError("Error fetching location details: " + error.message);
      setLoading(false);
    }
  }, []);

  return { address, error, loading, fetchLocationDetails };
}
