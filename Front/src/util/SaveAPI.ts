import API from "./axios";
// const URL = "/animals";

export interface RegistrationData {
  animalType: string;
  breed: string;
  age: string;
  weight: string;
  rescueDate: string;
  selectedCity: string;
  selectedDistrict: string;
  detailInfo: string;
  isNeuter: boolean;
  gender: string;
  feature: string;
  state: string;
  imgUrl: string;
}

export const search = (data: RegistrationData) => {
  console.log(data);
  return API.get("/api/animals", {
    method: "GET",
  })
    .then((res) => {
      // console.log("Response:", res);
      return res;
    })
    .catch((err) => {
      console.error("Error:", err);
      return err.response;
    });
};

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
      return res;
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
  console.log(token);
  console.log(data);
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
