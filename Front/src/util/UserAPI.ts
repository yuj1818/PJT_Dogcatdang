import API from "./axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const URL = "/api/users";

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
  imgUrl: string;
}

export interface oauthSignUpData {
  username: string | undefined;
  email: string | undefined;
  nickname: string;
  phone: string;
  address: string; 
  role: string;
  password: string;
}

export interface infoData {
  id: number;
  username: string;
  role: string;
  email: string;
  nickname: string;
  address: string;
  phone: string;
  imgUrl: string;
  bio: string;
}

export interface editedInfoData {
  email: string;
  nickname: string;
  address: string;
  phone: string;
  imgUrl: string;
  bio: string;
}

export interface editedInfoDataWithPassword extends editedInfoData {
  password: string;
  passwordConfirm: string;
}

export const signIn = (data: signInData) => {


  return API.post(URL+ "/login", data)

    .then((res) => {
      const token = res.headers["authorization"];

      if (cookie.get("U_ID")) {
        cookie.remove("U_ID");
      }
      
      cookie.set("U_ID", token);

      const decodedData = jwtDecode(token);
      const date = new Date(0);

      localStorage.setItem("userInfo", JSON.stringify(decodedData));
      localStorage.setItem("recentSeen", JSON.stringify([]));
      localStorage.setItem("expiration", JSON.stringify(date.setUTCSeconds(decodedData.exp || 0)));
      return res;
    })
    .catch((err) => {
      return err.response;
    })
};

export const signUp = (data: signUpData) => {
  return API.post(URL + "/join", data).then((res) => {
    return res;
  });
};

export const checkUsername = (data: { username: string }) => {
  return API.post(URL + "/username-check", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const checkEmail = (data: { email: string }) => {
  return API.post(URL + "/email-check", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const checkNickname = (data: { nickname: string }) => {
  return API.post(URL + "/nickname-check", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const logout = () => {
  return API.post(URL + "/logout").then((res) => {
    cookie.remove("U_ID");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("recentSeen");
    localStorage.removeItem("expiration");
    return res;
  });
};

export const getUserInfo = (userId: string) => {
  return API.get(URL + "/profiles/" + userId)
    .then((res) => {
      return res;
    });
};

export const editUserInfo = (
  userId: string,
  data: editedInfoData | editedInfoDataWithPassword
) => {
  return API.put(URL + "/profiles/" + userId, data, {
    method: "PUT",
    headers: {
      Authorization: cookie.get("U_ID"),
    },
  }).then((res) => {
    return res;
  });
};

export const oauthSignUp = (data: oauthSignUpData) => {
  return API.post('/api/oauth2/join', data)
    .then((res) => {
      return res;
    });
};

export const getToken = () => {
  return API.get('/api/oauth2/token')
    .then((res) => {
      const token = res.data.token;

      if (cookie.get("U_ID")) {
        cookie.remove("U_ID");
      }
      
      cookie.set("U_ID", `Bearer ${token}`);

      const decodedData = jwtDecode(token);
      const date = new Date(0);

      localStorage.setItem("userInfo", JSON.stringify(decodedData));
      localStorage.setItem("recentSeen", JSON.stringify([]));
      localStorage.setItem("expiration", JSON.stringify(date.setUTCSeconds(decodedData.exp || 0)));
      return res;
    });
};

export const getLikedAnimals = (userId: string) => {
  return API.get(URL + "/profiles/details/liked-animals/" + userId, {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res.data;
    });
};

export const getPosts = (userId: string) => {
  return API.get(URL + "/profiles/details/posts/" + userId, {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res.data;
    });
};

export const getProtectedAnimals = (userId: string) => {
  return API.get(URL + "/profiles/details/protected-animals/" + userId, {
    method: "GET",
    headers: {
      Authorization: cookie.get("U_ID"),
    }
  })
    .then((res) => {
      return res.data;
    });
}