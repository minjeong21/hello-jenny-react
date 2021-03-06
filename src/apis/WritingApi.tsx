import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

const instance = axios.create({
  baseURL: process.env.REACT_APP_DRF_API,
  timeout: 5000,
});

export const fetchRepWriting = async () => {
  return instance
    .get("/writing/recap/")
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchWritings = async () => {
  return instance
    .get("/writing/list/")
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
export const fetchWritingListFiltered = async (
  levels: string,
  themes: string
) => {
  return instance
    .get(`/writing/list/filtered/?theme=${themes}&level=${levels}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchWritingByNumId = async (id: number) => {
  const url = `/writing/${id}/`;
  return instance
    .get(url)
    .then((response) => response.data)
    .catch(function (error) {
      let status = error.response ? error.response.status : null;
      if (status === 404) {
        return status;
      } else {
        return error;
      }
    });
};
