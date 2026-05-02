import axios from "axios";

// ambil base url dari .env
const API_BASE_URL = process.env.REACT_APP_API_URL;

// instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// inject token otomatis
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// handle error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error("Request timeout"));
    }

    if (error.response) {
      const message =
        error.response.data?.message || "Terjadi kesalahan pada server";

      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }

      return Promise.reject(new Error(message));
    }

    return Promise.reject(new Error("Tidak dapat terhubung ke server"));
  }
);

export default api;
