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
  imgName: string;
  imgUrl: string;
}

export const search = (data: RegistrationData) => {
  console.log(data);
  return API.get("/animals")
    .then((res) => {
      console.log("Response:", res);
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
  return API.post("/animals", data, {
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

export const saveUpdate = (data: RegistrationData, token: string, animalID: string) => {
  console.log(token);
  console.log(data);
  return API.put(`/animals/${animalID}`, data, {
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
