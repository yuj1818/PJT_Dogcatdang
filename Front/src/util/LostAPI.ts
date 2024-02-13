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
  imgUrl: string;
}

export interface LostFilterData {
  animalType: string;
  breed: string;
  selectedCity: string;
  selectedDistrict: string;
  gender: string;
}

export const lost_search = (data: LostFilterData, token: string) => {
  console.log(data);
  return API.post("/api/lost-animals/filter", data, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      console.log("Response:", res.data.lostAnimalDtoList);
      return res.data.lostAnimalDtoList;
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
