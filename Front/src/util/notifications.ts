import { Cookies } from "react-cookie";
import API from "./axios";

const URL = "/api/users/notification/received";

interface RequestNotiInterface {
  signal: AbortSignal;
}
export interface RequestNotiInterfaceInterface {
  id: number;
  senderEmail: string;
  receiverEmail: string;
  title: string;
  content: string;
  sentDate: string;
  isRead: boolean;
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

    return response.data as RequestNotiInterfaceInterface[];
  } catch (error) {
    throw error;
  }
};
