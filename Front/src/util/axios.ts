import axios from "axios";

const env = import.meta.env.VITE_IS_PRODUCTION || "development";
export const isProduction = env === "production";

export const HOST = isProduction ? "i10e202.p.ssafy.io" : "http://localhost";

export const PORT = ":8084";

export const URL = HOST + PORT;

const API = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export default API;
