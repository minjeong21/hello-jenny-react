import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_DFR_API,
  timeout: 5000,
  // headers: {
  //   Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  // },
});

export const fetchRecapWritings = async () => {
  return instance
    .get("/recap/")
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetch = async () => {
  return instance
    .get("/recap/")
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

export const fetchWritingListByTheme = async (theme: string) => {
  return instance
    .get(`/pracitce/theme/${theme}/list/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchWritingListByLevel = async (level: number) => {
  return instance
    .get(`/pracitce/level/${level}/list/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
