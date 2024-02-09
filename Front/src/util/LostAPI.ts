import API from "./axios";

export interface RegistrationData {
  animalType: string;
  name: string;
  breed: string;
  age: string;
  weight: string;
  lostDate: string;
  selectedCity: string;
  selectedDistrict: string;
  detailInfo: string;
  gender: string;
  feature: string;
  state: string;
  imgName: string;
  imgUrl: string;
}

export const lost_search = (data: RegistrationData) => {
  console.log(data);
  return API.get("/api/lost-animals")
    .then((res) => {
      console.log("Response:", res);
      return res;
    })
    .catch((err) => {
      console.error("Error:", err);
      return err.response;
    });
};

export const lost_regist = (data: RegistrationData, token: string) => {
  console.log(token);
  console.log(data);
  return API.post("/api/lost-animals", data, {
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

export const lostUpdate = (
  data: RegistrationData,
  token: string,
  animalID: string
) => {
  return API.put(`/api/lost-animals/${animalID}`, data, {
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
