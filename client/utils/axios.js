import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || {
        data: {
          message: "Something went wrong!",
        },
      }
    )
);

export default axiosInstance;

export const endpoints = {
  auth: {
    me: "/auth/user/me",
    login: "/auth/user/login",
    register: "/auth/user/register",
    sendOTP: "/auth/user/resend-otp",
    verifyOTP: "/auth/user/validate-otp",
  },
};
