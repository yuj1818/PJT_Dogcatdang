import API from "./axios";
import { Cookies } from "react-cookie";

const URL = "/api/reservations";
const cookie = new Cookies();
const token = cookie.get("U_ID");

interface reservationData {
  reservationTime: string;
  name: string;
  phone: string;
  visitor: number;
}

export const makeReservation = (data: reservationData, animalId: string) => {
  console.log(data);
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