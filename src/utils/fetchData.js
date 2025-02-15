import axios from "axios";

const fetchData = axios.create({
  baseURL: "https://iapitest.eva.guru/",
  headers: {
    "Content-Type": "application/json",
  },
});

fetchData.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default fetchData;