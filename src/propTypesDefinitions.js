import PropTypes from "prop-types";

export const weatherPropTypes = PropTypes.shape({
  temp: PropTypes.number,
  feels_like: PropTypes.number,
  name: PropTypes.string,
  humidity: PropTypes.number,
  details: PropTypes.string,
  country: PropTypes.string,
  formattedLocalTime: PropTypes.string,
  dt: PropTypes.number,
  timezone: PropTypes.string,
  lat: PropTypes.number,
  lon: PropTypes.number,
  sea_level: PropTypes.number,
  icon: PropTypes.string,
  hourlyData: PropTypes.arrayOf(
    PropTypes.shape({
      temp: PropTypes.number,
      dt: PropTypes.number,
      title: PropTypes.string,
      icon: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  dailyData: PropTypes.arrayOf(
    PropTypes.shape({
      tempMin: PropTypes.number,
      tempMax: PropTypes.number,
      icon: PropTypes.string,
      title: PropTypes.string,
      date: PropTypes.string,
    })
  ),
});
