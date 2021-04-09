import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MOCK_SERVER_API,
  timeout: 5000,
  // headers: {
  //   Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  // },
});

export const fetchMainWritingList = async () => {
  return instance
    .get("/writing/list/")
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

export const fetchWritingByTheme = async (theme: string) => {
  return instance
    .get(`/pracitce/theme/${theme}/list/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};

export const fetchWritingByLevel = async (level: string) => {
  return instance
    .get(`/pracitce/level/${level}/list/`)
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
      return error;
    });
};
