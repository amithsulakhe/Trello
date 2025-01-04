import axiosInstance from "@/utils/axios";
import { STORAGE_KEY } from "./constant";

export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid token!");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}

export function tokenExpired(exp) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      alert("Token expired!");
      localStorage.removeItem(STORAGE_KEY);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during token expiration:", error);
      throw error;
    }
  }, timeLeft);
}

export function isValidToken(token) {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);

    if (!decoded || !("exp" in decoded)) {
      return false;
    }
    // decoded.exp which is in seconds
    // Date.now() / 1000; // current time in seconds
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
}

export async function setSession(token) {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

      const decodedToken = jwtDecode(token); // jwt exp time 10000 seconds in backend 2hr 46min

      if (decodedToken && "exp" in decodedToken) {
        tokenExpired(decodedToken.exp);
      } else {
        throw new Error("Invalid access token!");
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}
