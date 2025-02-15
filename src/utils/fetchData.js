import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://iapitest.eva.guru/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;