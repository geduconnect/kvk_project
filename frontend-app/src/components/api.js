import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Warn if API URL is missing
if (!API_URL) {
  console.warn("⚠️ VITE_API_URL is missing in .env file");
}

const api = axios.create({
  baseURL: API_URL || "http://localhost:8000/api",
  withCredentials: true,
  timeout: 15000, // more reliable on VPS
});

export default api;
