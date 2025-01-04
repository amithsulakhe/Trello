import { createSlice } from "@reduxjs/toolkit";

import axiosInstance, { endpoints } from "@/utils/axios";

const initialState = {
  user: null,
  error: null,
};
const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = signUpSlice.actions;

export default signUpSlice.reducer;

// resend otp
export const sendOTP = (payload) => async (dispatch, getState) => {
  try {
    const response = await axiosInstance.post(endpoints.auth.sendOTP, payload);
    if (response.status === 200) {
      dispatch(setError(null));
    }
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};

// validate otp
export const verifyOTP = (payload) => async (dispatch, getState) => {
  try {
    const response = await axiosInstance.post(
      endpoints.auth.verifyOTP,
      payload
    );
    if (response.status === 200) {
      dispatch(setError(null));
    }
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};
