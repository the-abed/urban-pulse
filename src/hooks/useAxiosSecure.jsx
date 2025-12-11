import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // 
});

// Request Interceptor → Attach JWT to every request
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor → Handle expired/invalid JWT
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // auto logout
    }
    return Promise.reject(error);
  }
);



const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
