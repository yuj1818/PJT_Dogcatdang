import { Cookies } from "react-cookie";
import API from "./axios";

const URL = "/api/users/notification";

interface RequestNotiInterface {
  signal: AbortSignal;
}
export interface RequestNotiInterfaceInterface {
  id: number;
  senderId: number;
  receiverId: number;
  senderNickname: string;
  receiverNickname: string;
  title: string;
  content: string;
  sentDate: string;
  isRead: boolean;
}

export const requestNoti = async ({ signal }: RequestNotiInterface) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");
  try {
    const response = await API.get(URL + "/received", {
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

interface RequestDeleteNotiItnerface {
  id: number;
}

export const requstDeleteNoti = async ({ id }: RequestDeleteNotiItnerface) => {
  const cookie = new Cookies();
  const token = cookie.get("U_ID");

  try {
    await API.delete(`/api/users/notification/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    return null;
  } catch (error) {
    throw error;
  }
};
