import API from "./axios";
import { Cookies } from "react-cookie";
// const URL = "/animals";

const cookie = new Cookies();

export interface RegistrationData {
  animalType: string;
  breed: string;
  age: string;
  weight: string;
  rescueDate: string;
  selectedCity: string;
  selectedDistrict: string;
  detailInfo: string;
  isNeuter: string;
  gender: string;
  feature: string;
  state: string;
  imgUrl: string;
}

export interface FilterData {
  animalType: string;
  breed: string;
  selectedCity: string;
  selectedDistrict: string;
  gender: string;
  userNickname: string;
}

export interface searchingData {
  code: string | null;
  breed: string | null;
  state: string | null;
}

export const regist = (data: RegistrationData, token: string) => {
  console.log(token);
  console.log(data);
  return API.post("/api/animals", data, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("Response:", res);
      const animalList = res.data.animalDtoList;
      if (animalList === undefined) {
        throw new Error("return 값이 없습니다");
      }
      return animalList;
    })
    .catch((err) => {
      console.error("Error:", err);
      return err.response;
    });
};

export const saveUpdate = (
  data: RegistrationData,
  token: string,
  animalID: string
) => {
  return API.put(`/api/animals/${animalID}`, data, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("Response:", res);
      return res;
    })
    .catch((err) => {
      console.error("Error:", err);
      return err.response;
    });
};

export const search = (data: FilterData, token: string) => {
  console.log(data);
  return API.post("api/animals/filter", data, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("Response:", res.data);
      return res.data.animalDtoList;
    })
    .catch((err) => {
      if (err.response && err.response.status === 204) {
        return;
      } else {
        console.error("Error filtered data:", err);
        throw err;
      }
    });
};

export const getNumberOfAnimals = () => {
  return API.get("/api/shelter/animals/count", {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    },
  }).then((res) => {
    return res.data;
  });
};

export const getAnimalData = (page: number) => {
  return API.get("/api/shelter/animals", {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    },
    params: {
      page,
    },
  }).then((res) => {
    return res.data;
  });
};

export const searchAnimalData = (data: searchingData) => {
  return API.post("/api/shelter/animals/filter", data, {
    method: "POST",
    headers: {
      Authorization: cookie.get("U_ID"),
    },
  }).then((res) => {
    return res;
  });
};
