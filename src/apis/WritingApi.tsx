import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DFR_API,
  timeout: 10000,
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
  return instance
    .get(`/writing/${id}/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
