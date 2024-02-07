import API from "./axios";
import { Cookies } from "react-cookie";

const URL = "/api/reservations";
const cookie = new Cookies();
const token = cookie.get("U_ID");

interface reservationData {
  reservationTime: Date;
  name: string;
  phone: string;
  visitor: number;
}

export const makeReservation = (data: reservationData, animalId: string) => {
  return API.post(URL + `/${animalId}`, data, {
    method: "POST",
    headers: {
      Authorization: token,
    }
  })
    .then((res) => {
      return res;
    });
};

export const getReservations = () => {
  return API.get(URL, {
    method: "GET",
    headers: {
      Authorization: token,
    }
  })
    .then((res) => {
      return res.data;
    });
};