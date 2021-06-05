import axios from "axios";
import { getKakaoCallMethodObject, Method } from "utils/UserAgent";
const BASE_KAKAO_LOGIN_API = `${process.env.REACT_APP_DRF_API}/user/rest-auth/kakao/`;
const KAKAO_OAUTH_TOKEN_API = `https://kauth.kakao.com/oauth/token`;

const instance = axios.create({
  baseURL: process.env.REACT_APP_DRF_API,
  timeout: 5000,
});

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  return instance
    .post("/user/register/", { email, username, nickname: username, password })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const loginUser = async (email: string, password: string) => {
  return instance
    .post("/api-jwt-auth/", { email, password })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchUserProfile = async (jwtToken: string) => {
  const config = {
    headers: {
      Authorization: "jwt " + jwtToken,
    },
  };
  return instance
    .get("/user/detail/", config)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const loginKakaoLastStep = (access_token: string) => {
  const URI = `${BASE_KAKAO_LOGIN_API}`;
  let browserObject = getKakaoCallMethodObject(navigator.userAgent);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = Method.API ? { access_token } : { access_token };
  console.log("URI: " + URI);
  console.log("data:", JSON.stringify(data));
  console.log("config:", JSON.stringify(config));
  return instance
    .post(URI, data, config)
    .then((response) => response.data)
    .catch((error) => error);
};

export const getAccessTokenFromKakao = (formBody: any) => {
  const URI = `${KAKAO_OAUTH_TOKEN_API}`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: formBody,
  };
  console.log("URI: " + URI);
  console.log(JSON.stringify(config));
  return instance
    .post(URI, config)
    .then((response) => response.data)
    .catch((error) => error);
};

export const getUserByEmail = (email: string) => {
  return instance
    .post("/user/email/", { email })
    .then((response) => response.data)
    .catch((error) => error);
};
