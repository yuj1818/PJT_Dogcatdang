import axios from "axios";
import { logout } from "./UserAPI";

const env = import.meta.env.VITE_IS_PRODUCTION || "development";
export const isProduction = env === "production";

export const HOST = isProduction ? "주소" : "http://localhost";

export const PORT = ":8443";

export const URL = isProduction ? HOST : HOST + PORT;

const API = axios.create({
  baseURL: URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 401 && error.message.includes("expire")) {
      await logout();
      window.location.href = "/landing";
    }
    return Promise.reject(error);
  }
);

export default API;
