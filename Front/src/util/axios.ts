import axios from "axios";
import { Cookies } from "react-cookie";

const env = import.meta.env.VITE_IS_PRODUCTION || "development";
export const isProduction = env === "production";


export const HOST = isProduction ? "https://i10e202.p.ssafy.io" : "http://localhost";

export const PORT = ":8443";

export const URL = isProduction? HOST : HOST + PORT;

const API = axios.create({
  baseURL: URL,
  withCredentials: true,
});

const cookie = new Cookies();

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 401) {
      await cookie.remove("U_ID");
      localStorage.clear();
      window.location.href = "/landing";
    }
  }
)

export default API;
