import { axiosClient } from "../api/axiosClient";
import dayjs from "dayjs";

const TrafficImagesService = {
  async getTrafficImages(date = dayjs()) {
    const formattedDate = date.format("YYYY-MM-DD[T]HH:mm:ss");
    const getParam = `date_time=${formattedDate}`;
    const response = await axiosClient.get(
      `/transport/traffic-images?${getParam}`
    );
    const { status, data } = response;

    if (status === 200) {
      return data;
    } else {
      return { status };
    }
  },
};

export default TrafficImagesService;
