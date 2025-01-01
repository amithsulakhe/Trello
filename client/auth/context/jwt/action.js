import axiosInstance, { endpoints } from "@/utils/axios";
import { setSession } from "./utils";

export const loginWithPassword = async ({ email, password }) => {
  try {
    const payload = { email, password };

    const response = await axiosInstance.post(endpoints.auth.login, payload);

    const { token } = response.data.data;

    if (!token) {
      throw new Error("Token not found");
    }
    setSession(token);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
