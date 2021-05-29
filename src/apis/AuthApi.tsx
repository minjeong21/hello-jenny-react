import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DFR_API,
  timeout: 10000,
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
