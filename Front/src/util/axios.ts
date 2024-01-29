import axios from "axios";

const env = process.env.NODE_ENV || "development";
export const isProduction = env === "production";

export const HOST = "http://localhost";

export const PORT = ":8084";

export const URL = HOST + PORT + "/api";

const client = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const API = () => {
  return client;
};
