import axios from "axios";
import React, { useEffect } from "react";

import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Intercept request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`;
        return config;
      }
    );
    // Intercept response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log(error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
