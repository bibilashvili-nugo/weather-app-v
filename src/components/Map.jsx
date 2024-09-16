import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "../customHooks/useGeolocation";
import useLocalStorage from "../customHooks/useLocalStorage";

const Map = ({ onClose, setGetLocationFromMap }) => {
  const mapRef = useRef();
  const [userPosition, setUserPosition] = useLocalStorage("USER_MARKER", {
    latitude: 0,
    longitude: 0,
  });
  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage(
    "NEARBY_MARKERS",
    []
  );

  const location = useGeolocation();

  useEffect(() => {
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const closeButton = L.control({ position: "topright" });

    closeButton.onAdd = function () {
      const div = L.DomUtil.create(
        "div",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );
      div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      div.style.width = "40px";
      div.style.height = "40px";
      div.style.border = "2px solid rgba(0, 0, 0, 0.2)";
      div.style.borderRadius = "10%";
      div.style.cursor = "pointer";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "center";
      div.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)";
      div.style.fontSize = "18px";
      div.style.color = "#333";
      div.style.border = "none";
      div.style.fontWeight = "bold";
      div.style.textAlign = "center";
      div.style.color = "grey";
      div.style.zIndex = "1000";

      div.innerHTML = "X";

      div.onmouseover = () => {
        div.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
      };
      div.onmouseout = () => {
        div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
      };

      div.onclick = () => {
        onClose();
      };
      return div;
    };

    closeButton.addTo(map);

    map.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      setGetLocationFromMap();
      const marker = L.marker([lat, lng]).addTo(map);
      mapRef.current.addEventListener("click", () => {});
      marker
        .bindPopup(`Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        .openPopup();
      console.log(marker._latlng, "marker");

      setNearbyMarkers((prevMarkers) => [
        ...prevMarkers,
        { latitude: lat, longitude: lng },
      ]);

      marker.on("mouseover", () => {
        marker
          .bindPopup(`Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
          .openPopup();
      });
    });

    return () => map.remove();
  }, [onClose, setNearbyMarkers]);

  const mapStyle = {
    height: "100vh",
    width: "100%",
  };

  return <div ref={mapRef} style={mapStyle}></div>;
};

export default Map;
