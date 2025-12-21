import axios from "axios";

// ✅ Create an Axios instance with baseURL and credentials
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // automatically send cookies
    timeout: 10000, // ✅ prevents hanging forever
});

export default api;
