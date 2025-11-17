import axios from "axios";

const api = axios.create({
  baseURL: "https://nagendrasir.onrender.com/api",
});

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });


// AUTO SEND TOKEN
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
