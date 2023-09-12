import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiCloudy,
  WiNightAltPartlyCloudy,
  WiNightAltCloudy,
  WiDayShowers,
  WiNightShowers,
  WiDayRain,
  WiNightAltRain,
} from "weather-icons-react";

interface WeatherIconsProps {
  forecast: string;
}

function WeatherIcons({ forecast }: WeatherIconsProps) {
  const COLOR_BLACK = "#000";
  const weather = forecast.toLowerCase();
  if (weather.includes("night")) {
    // Night Time
    if (weather.includes("partly cloudy")) {
      return <WiNightAltPartlyCloudy size={240} color={COLOR_BLACK} />;
    } else if (weather.includes("cloudy")) {
      return <WiNightAltCloudy size={240} color={COLOR_BLACK} />;
    } else if (weather.includes("showers")) {
      return <WiNightShowers size={240} color={COLOR_BLACK} />;
    } else if (weather.includes("rain")) {
      return <WiNightAltRain size={240} color={COLOR_BLACK} />;
    }
    return <WiNightClear size={240} color={COLOR_BLACK} />;
  } else {
    // Day Time
    if (weather.includes("partly cloudy")) {
      return <WiCloud size={240} color={COLOR_BLACK} />;
    } else if (weather.includes("cloudy")) {
      return <WiCloudy size={240} color={COLOR_BLACK} />;
    } else if (weather.includes("showers")) {
      return <WiDayShowers size={240} color={COLOR_BLACK} />;
    } else if (weather.includes("rain")) {
      return <WiDayRain size={240} color={COLOR_BLACK} />;
    }
    return <WiDaySunny size={240} color={COLOR_BLACK} />;
  }
}

export default WeatherIcons;
