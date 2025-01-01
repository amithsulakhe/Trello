"use client";

import axios from "axios";
import { useEffect, useMemo, useState, useCallback } from "react";

import axiosInstance, { endpoints } from "@/utils/axios";

import { AuthContext } from "../auth-context";
import { STORAGE_KEY } from "./constant";
import { isValidToken, setSession } from "./utils";

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (token && isValidToken(token)) {
        setSession(token);
        const response = await axiosInstance.get(endpoints.auth.me);

        const user = response.data.data.data;

        setState({
          user: {
            ...user,
            token,
          },
          loading: false,
        });
      } else {
        setState({
          user: null,
          loading: false,
        });
      }
    } catch (error) {
      setState({
        user: null,
        loading: false,
      });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthenticated = state?.user ? "authenticated" : "unauthenticated";

  const status = state?.loading ? "loading" : checkAuthenticated;

  const value = useMemo(
    () => ({
      user: state?.user,
      checkUserSession,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
    }),
    [state?.user, checkUserSession, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
