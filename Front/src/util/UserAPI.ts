import API  from "./axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

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

export const signIn = ( data: signInData ) => {
  return API.post('http://localhost:8084/login', data)
    .then(res => {
      console.log(res)

      if (res.status === 200) {
        console.log(res.data);
        const token = res.headers["authorization"];
        cookie.set('U_ID', token);
        
        const decodedData = jwtDecode(token);
        localStorage.setItem('userInfo', JSON.stringify(decodedData));
      }

      return res;
    });
};

export const signUp = ( data: signUpData ) => {
  return API.post(URL + '/join', data)
    .then(res => {
      return res;
    });
};

export const checkUsername = ( data: { username: string } ) => {
  return API.post(URL + '/username-check', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err.response;
    });
};

export const checkEmail = ( data: { email: string } ) => {
  return API.post(URL + '/email-check', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err.response;
    });
};

export const checkNickname = ( data: { nickname: string } ) => {
  return API.post(URL + '/nickname-check', data)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err.response;
    });
};

// export const logout = () => {
//   return API.get('http://localhost:8084/logout')
//     .then(res => {
//       cookie.remove('U_ID');
//       localStorage.removeItem('userInfo')
//       return res;
//     })
// }
