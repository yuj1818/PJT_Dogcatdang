import { Cookies } from "react-cookie";
import API from "./axios";

const URL = "/api/notifications";

interface RequestNotiInterface {
  signal: AbortSignal;
}
export const requestnoti = async ({ signal }: RequestNotiInterface) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  try {
    const response = await API.get(URL, {
      signal,
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
