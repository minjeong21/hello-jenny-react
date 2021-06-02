import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

const instance = axios.create({
  baseURL: process.env.REACT_APP_DFR_API,
  timeout: 5000,
});

export const fetchRepSpeaking = async () => {
  return instance
    .get("/speaking/recap/")
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchSpeakings = async () => {
  return instance
    .get("/speaking/list/")
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
export const fetchSpeakingListFiltered = async (
  levels: string,
  themes: string
) => {
  return instance
    .get(`/speaking/list/filtered/?theme=${themes}&level=${levels}`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchSpeakingByNumId = async (id: number) => {
  const url = `/speaking/${id}/`;
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
