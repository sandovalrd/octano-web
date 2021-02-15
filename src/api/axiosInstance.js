import axios from "axios";
import httpRequests from "./httpRequests";

const axiosInstance = axios.create({
  timeout: 25000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  data: {},
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const response = await httpRequests.getToken();
    config.headers.Authorization = `${response.data.token}`;
    return config;
  } catch (error) {
    throw error;
  }
});

export default axiosInstance;
