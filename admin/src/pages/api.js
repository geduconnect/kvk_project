import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // ✅ send cookies with every request
});

// Optionally handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
