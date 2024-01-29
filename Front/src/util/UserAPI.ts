import { API } from "./axios";
import { Cookies } from "react-cookie";

const URL = "/user";

const cookie = new Cookies();

export interface signInData {
  username: string;
  password: string;
}

export interface signUpData {
  username: string;
  role: string;
  code: string;
  email: string;
  password: string;
  nickname: string;
  address: string;
  phone: string;
  imgName: string;
  imgUrl: string;
}

export const signIn = (data: signInData) => {
  return API()
    .post(URL + "/login", data)
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        console.log(res.data);
        cookie.set("U_ID", res.headers["authorization"]);
      }

      return res;
    });
};

export const signUp = (data: signUpData) => {
  return API()
    .post(URL + "/join", data)
    .then((res) => {
      return res;
    });
};
