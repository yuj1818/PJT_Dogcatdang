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

export interface FilterData {
  animalType: string;
  breed: string;
  selectedCity: string;
  selectedDistrict: string;
  gender: string;
  userNickname: string;
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
    console.log("Response:", res.data.animalDtoList);
    return res.data.animalDtoList;
  })
  .catch((err) => {
    if (err.response && err.response.status === 204) {
      return 
    } else {
      console.error("Error filtered data:", err);
      throw err;
    }
  });
};