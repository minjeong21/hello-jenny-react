import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MOCK_SERVER_API,
  timeout: 5000,
  // headers: {
  //   Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  // },
});

export const fetchPractices = async () => {
  return instance.get("/list/").catch(function (error) {
    console.log(error);
    return error;
  });
};

export const fetchPracticeByNumId = async (id: number) => {
  return instance.get(`/practice/${id}/`).catch(function (error) {
    console.log(error);
    return error;
  });
};

export const fetchPracticeByTheme = async (theme: string) => {
  return instance.get(`/pracitce/theme/${theme}/list/`).catch(function (error) {
    console.log(error);
    return error;
  });
};

export const fetchPracticeByLevel = async (level: string) => {
  return instance.get(`/pracitce/level/${level}/list/`).catch(function (error) {
    console.log(error);
    return error;
  });
};
