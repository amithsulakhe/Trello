import axiosInstance, { endpoints } from "@/utils/axios";
import { setSession } from "./utils";
import { paths } from "@/utils/constants";
import { setUser } from "@/redux/slices/sign-up-slice";

export const loginWithPassword = async ({
  email,
  password,
  router,
  dispatch,
}) => {
  try {
    const payload = { email, password };

    const response = await axiosInstance.post(endpoints.auth.login, payload);

    const { token } = response.data.data;

    const { isverified } = response.data.data.data;

    if (!isverified) {
      dispatch(setUser(response.data.data.data));
      router.push(paths.auth.otpVerify);
      return true;
    }
    if (!token) {
      throw new Error("Token not found");
    }
    setSession(token);
    return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerWithPassword = async (payload) =>
  axiosInstance.post(endpoints.auth.register, payload);
