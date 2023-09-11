import { axiosClient } from "../api/axiosClient";
import dayjs from "dayjs";

const WeatherForecastService = {
  async getWeatherForecast(date = dayjs()) {
    const formattedDate = date.format("YYYY-MM-DD[T]HH:mm:ss");
    const getParam = `date_time=${formattedDate}`;
    const response = await axiosClient.get(
      `/environment/2-hour-weather-forecast?${getParam}`
    );
    const { status, data } = response;

    if (status === 200) {
      return data;
    } else {
      return { status };
    }
  },
};

export default WeatherForecastService;
