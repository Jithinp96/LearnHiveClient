import { clearAdminToken } from "@/redux/slices/adminSlice";
import { logoutStudent } from "@/redux/slices/studentSlice";
import { logoutTutor } from "@/redux/slices/tutorSlice";
import { persistor, store } from "@/redux/store";
import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    if (error.response?.status === 401) {
      // Reset Redux slices
      store.dispatch(logoutStudent());
      store.dispatch(logoutTutor());
      store.dispatch(clearAdminToken());

      // Clear persisted storage
      persistor.purge();
      toast.error("Your session has expired. Please login again!")
      // Optionally redirect to login page
      // window.location.href = "/login"; // Adjust to your login page route
    }

    // Reject the error for further handling
    return Promise.reject(error);
  }
);


export default axiosInstance;