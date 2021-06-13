import axios from "axios";
const BASE_KAKAO_LOGIN_API = `${process.env.REACT_APP_DRF_API}/user/rest-auth/kakao/`;
const BASE_GOOGLE_LOGIN_API = `${process.env.REACT_APP_DRF_API}/user/rest-auth/google/`;
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
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = { access_token };
  console.log("URI: " + URI);
  console.log("data:", JSON.stringify(data));
  console.log("config:", JSON.stringify(config));
  return instance
    .post(URI, data, config)
    .then((response) => response.data)
    .catch((error) => error);
};

export const loginWithGoogle = (access_token: string) => {
  const URI = `${BASE_GOOGLE_LOGIN_API}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = { access_token };
  console.log("URI: " + URI);
  console.log("data:", JSON.stringify(data));
  console.log("config:", JSON.stringify(config));
  return instance
    .post(URI, data, config)
    .then((response) => response.data)
    .catch((error) => error);
};

export const getAccessTokenFromKakao = (code: string) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append(
    "client_id",
    process.env.REACT_APP_KAKAO_REST_API_KEY
      ? process.env.REACT_APP_KAKAO_REST_API_KEY
      : ""
  );
  params.append("redirect_uri", `${process.env.REACT_APP_PUBLIC_URL}/oauth/`);
  params.append("code", code);

  const URI = `${KAKAO_OAUTH_TOKEN_API}`;
  console.log(URI);
  console.log(params);
  return instance
    .post(URI, params)
    .then((response) => response.data)
    .catch((error) => {
      alert(error.name); // ReferenceError
      alert(error.message); // lalala is not defined
      alert(error.stack); // ReferenceError: lalala is not defined at ... (호출 스택)

      return error;
    });
};

export const getUserByEmail = (email: string) => {
  return instance
    .post("/user/email/", { email })
    .then((response) => response.data)
    .catch((error) => error);
};
