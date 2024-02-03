import API from "./axios";

// const URL = "/animals";

export interface RegistrationData {
  animalType: string;
  breed: string;
  age: number;
  weight: number;
  rescueDate: Date;
  selectedCity: string;
  selectedDistrict: string;
  detailInfo: string;
  isNeuter: boolean;
  gender: string;
  feature: string;
  state: string;
  // imgName: string;
  // imgUrl: string;
}

export interface RegistrationResponse {
  status: number;
  data: RegistrationData;
}

export const regist = (data: FormData): Promise<RegistrationResponse> => {
  return API.post("http://localhost:8084/animals", data).then((res) => {
    console.log(res);

    if (res.status === 200) {
      console.log(res.data);
    }

    return res as RegistrationResponse;
  });
};
