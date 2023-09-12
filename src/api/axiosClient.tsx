import axios from "axios";

const API_URL = "https://api.data.gov.sg/v1";
const SECONDS = 1000;

const customAxios = axios.create();
customAxios.defaults.baseURL = API_URL;
customAxios.defaults.timeout = 10 * SECONDS;

export { customAxios as axiosClient };
