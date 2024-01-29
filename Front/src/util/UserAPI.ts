import { API } from "./axios";

const URL = '/api/users';

export interface signInData {
  uid: string;
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

export const signIn = ( data: signInData ) => {
  return API().post(URL + '/login', data)
    .then(res => {
      return res;
    });
};

export const signUp = ( data: signUpData ) => {
  return API().post(URL + '/join', data)
    .then(res => {
      return res;
    })
};