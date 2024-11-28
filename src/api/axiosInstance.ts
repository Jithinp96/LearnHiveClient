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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logoutStudent());
      store.dispatch(logoutTutor());
      store.dispatch(clearAdminToken());

      persistor.purge();
      toast.error("Your session has expired. Please login again!")

      // window.location.href = "/login"; // Adjust to your login page route
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;