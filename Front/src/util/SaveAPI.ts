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

// export interface RegistrationResponse {
//   status: number;
//   data: RegistrationData;
// }

export const regist = (data: RegistrationData) => {
  return API.post("http://localhost:8084/api/animals/", data).then((res) => {
    console.log(res);

    if (res.status === 200) {
      console.log(res.data);
    }

    return res;
  });
};
