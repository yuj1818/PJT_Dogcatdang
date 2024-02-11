import API from "./axios";
import { Cookies } from "react-cookie";

const URL = "/api/reservations";
const URL_ORG = "/api/shelter/reservations"
const cookie = new Cookies();

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
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res;
    });
};

export const getReservations = (date: string, isOrg: boolean) => {
  return API.get(`${isOrg ? URL_ORG : URL}` + '/by-date', {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    },
    params: {
      date
    }
  })
    .then((res) => {
      return res.data;
    });
};

export const getReservationDates = () => {
  return API.get(URL + '/dates', {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res.data;
    });
};

export const cancelReservation = (reservationId: number) => {
  return API.delete(URL + `/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res;
    });
};

export const getApplications = (months: number) => {
  return API.get(URL_ORG, {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID")
    },
    params: {
      months
    }
  })
    .then((res) => {
      return res.data;
    });
};

export const getApplicationDetail = (reservationId: number) => {
  return API.get(URL_ORG + `/${reservationId}`, {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res.data;
    });
};

export const changeState = (shelterId: number, reservationId: number, state: string) => {
  return API.put(URL_ORG + `/${shelterId}/${reservationId}`, {state}, {
    method: "PUT",
    headers: {
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res;
    });
};