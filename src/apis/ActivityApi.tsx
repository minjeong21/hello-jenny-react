import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DRF_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createSolvedWriting = async (writingId: number, jwt: string) => {
  instance.defaults.headers.common["Authorization"] = `jwt ${jwt}`;
  return instance
    .post(`/activity/solved/${writingId}/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
export const deleteSolvedWriting = async (writingId: number, jwt: string) => {
  instance.defaults.headers.common["Authorization"] = `jwt ${jwt}`;
  return instance
    .delete(`/activity/solved/${writingId}/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const getSolvedWritingList = async (jwt: string) => {
  instance.defaults.headers.common["Authorization"] = `jwt ${jwt}`;
  return instance
    .get(`/activity/solved/list/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
