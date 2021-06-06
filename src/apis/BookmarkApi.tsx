import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DRF_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createBookmark = async (writingId: number, jwt: string) => {
  instance.defaults.headers.common["Authorization"] = `jwt ${jwt}`;
  return instance
    .post(`/bookmark/${writingId}/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
export const deleteBookmark = async (writingId: number, jwt: string) => {
  instance.defaults.headers.common["Authorization"] = `jwt ${jwt}`;
  return instance
    .delete(`/bookmark/${writingId}/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const getBookmarkList = async (jwt: string) => {
  instance.defaults.headers.common["Authorization"] = `jwt ${jwt}`;
  return instance
    .get(`/bookmark/list/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
