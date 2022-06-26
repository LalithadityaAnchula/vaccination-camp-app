import { useEffect, useState, useRef } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL + "/",
  withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response;
  }
);

const getAuth = async () => {
  try {
    const res = await axiosInstance.get("/auth/authenticate");
    return res.data;
  } catch (err) {
    console.log(err);
    return { success: false, data: {} };
  }
};

export const useAuthStatus = () => {
  const [auth, setAuth] = useState({ isLoggedIn: false, role: null });
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isMounted) {
        const response = await getAuth();
        if (response.success)
          setAuth({ isLoggedIn: true, role: response.role });
        setCheckingStatus(false);
      }
    };
    checkAuthStatus();
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { auth, checkingStatus };
};

// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks
